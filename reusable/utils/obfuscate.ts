const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/** UTF-8 字符串 → Base64（纯 JS 实现，小程序/H5 通用，无需 btoa） */
function utf8ToBase64(str: string): string {
  const bytes: number[] = []
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i)
    if (char < 0x80) bytes.push(char)
    else if (char < 0x800) {
      bytes.push(0xc0 | (char >> 6), 0x80 | (char & 0x3f))
    } else if (char < 0xd800 || char >= 0xe000) {
      bytes.push(0xe0 | (char >> 12), 0x80 | ((char >> 6) & 0x3f), 0x80 | (char & 0x3f))
    } else {
      i++
      char = 0x10000 + (((char & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
      bytes.push(0xf0 | (char >> 18), 0x80 | ((char >> 12) & 0x3f), 0x80 | ((char >> 6) & 0x3f), 0x80 | (char & 0x3f))
    }
  }

  let out = ''
  let i = 0
  while (i < bytes.length) {
    const c1 = bytes[i++] & 0xff
    const c2 = i < bytes.length ? bytes[i++] : null
    const c3 = i < bytes.length ? bytes[i++] : null

    out += BASE64_CHARS[c1 >> 2]
    out += BASE64_CHARS[((c1 & 0x3) << 4) | (c2 === null ? 0 : (c2 & 0xf0) >> 4)]
    out += c2 === null ? '=' : BASE64_CHARS[((c2 & 0x0f) << 2) | (c3 === null ? 0 : (c3 & 0xc0) >> 6)]
    out += c3 === null ? '=' : BASE64_CHARS[c3 & 0x3f]
  }
  return out
}

/** Base64 → UTF-8 字符串（纯 JS 实现，小程序/H5 通用，无需 atob） */
export function base64ToUtf8(str: string): string {
  str = str.replace(/=+$/, '')
  const map: Record<string, number> = {}
  for (let i = 0; i < BASE64_CHARS.length; i++) map[BASE64_CHARS[i]] = i

  const bytes: number[] = []
  let i = 0
  while (i < str.length) {
    const e1 = map[str.charAt(i++)] ?? 0
    const e2 = map[str.charAt(i++)] ?? 0
    const e3 = str.charAt(i) === '' ? 64 : (map[str.charAt(i++)] ?? 64)
    const e4 = str.charAt(i) === '' ? 64 : (map[str.charAt(i++)] ?? 64)

    bytes.push((e1 << 2) | (e2 >> 4))
    if (e3 !== 64) bytes.push(((e2 & 0x0f) << 4) | (e3 >> 2))
    if (e4 !== 64) bytes.push(((e3 & 0x03) << 6) | e4)
  }

  let out = ''
  let idx = 0
  while (idx < bytes.length) {
    const c = bytes[idx++]
    if (c < 0x80) out += String.fromCharCode(c)
    else if ((c & 0xe0) === 0xc0) {
      out += String.fromCharCode(((c & 0x1f) << 6) | (bytes[idx++] & 0x3f))
    } else if ((c & 0xf0) === 0xe0) {
      out += String.fromCharCode(((c & 0x0f) << 12) | ((bytes[idx++] & 0x3f) << 6) | (bytes[idx++] & 0x3f))
    } else {
      const cp = ((c & 0x07) << 18) | ((bytes[idx++] & 0x3f) << 12) | ((bytes[idx++] & 0x3f) << 6) | (bytes[idx++] & 0x3f)
      out += String.fromCharCode(0xd800 + ((cp - 0x10000) >> 10), 0xdc00 + ((cp - 0x10000) & 0x3ff))
    }
  }
  return out
}

/** 混淆：JSON 对象 → 假乱码字符串 */
export function obfuscate(obj: unknown): string {
  const b64 = utf8ToBase64(JSON.stringify(obj))
  // 把 Base64 特征字符换掉，再反转，加干扰前缀
  const replaced = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '~')
  return 'RAW' + replaced.split('').reverse().join('')
}

/** 解混淆：假乱码字符串 → JSON 对象 */
export function deobfuscate(raw: string): unknown {
  if (typeof raw !== 'string' || !raw.startsWith('RAW')) {
    throw new Error('Invalid obfuscated format')
  }
  const body = raw.slice(3).split('').reverse().join('')
  const b64 = body.replace(/-/g, '+').replace(/_/g, '/').replace(/~/g, '=')
  return JSON.parse(base64ToUtf8(b64))
}

/**
 * 尝试解混淆，格式不对则原样返回。
 * 用于响应拦截：后端可能返回混淆字符串，也可能返回普通 JSON。
 * 格式：'e' + base64(JSON)
 */
export function tryDeobfuscate(raw: unknown): unknown {
  if (typeof raw === 'string' && raw.startsWith('e')) {
    const body = raw.slice(1)
    // 新格式：e + base64
    try {
      const decoded = base64ToUtf8(body)
      return JSON.parse(decoded)
    } catch {
      // 不是有效 base64，原样返回
      return raw
    }
  }
  if (typeof raw === 'string' && raw.startsWith('RAW')) {
    try {
      return deobfuscate(raw)
    } catch {
      return raw
    }
  }
  return raw
}
