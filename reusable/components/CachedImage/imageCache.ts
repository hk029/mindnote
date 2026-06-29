/**
 * ImageCache - 远程图片本地持久化缓存模块
 *
 * 首次访问远程图片后自动缓存到本地，重复访问直接读本地
 * 缓存路径: wx.env.USER_DATA_PATH + '/' + cacheKey + ext
 */
import Taro from '@tarojs/taro'

const FS = Taro.getFileSystemManager()

// 缓存目录名
const CACHE_DIR = 'image_cache'

// 获取缓存目录完整路径
function getCacheDir(): string {
  return `${Taro.env.USER_DATA_PATH}/${CACHE_DIR}`
}

// 确保缓存目录存在
function ensureCacheDir(): Promise<void> {
  return new Promise((resolve, reject) => {
    FS.mkdir({
      dirPath: getCacheDir(),
      recursive: true,
      success: () => resolve(),
      fail: (err: { errMsg?: string }) => {
        // 目录已存在时不报错
        if (err.errMsg?.includes('file already exists')) {
          resolve()
        } else {
          reject(err)
        }
      },
    })
  })
}

// 判断是否为远程 URL
export function isRemoteUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

// 获取文件扩展名
function getExt(url: string): string {
  const match = url.match(/\.[^.]+$/)
  return match ? match[0].toLowerCase() : '.png'
}

// 将 URL 转为本地文件名（用 MD5 避免碰撞）
function urlToCacheKey(url: string): string {
  const ext = getExt(url)
  // 用字符码乘积累加做简单 hash，跨平台可靠
  let hash = 5381
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) + hash) + url.charCodeAt(i)
    hash = hash & hash
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  return hex + ext
}

// 获取本地缓存路径
function getLocalPath(url: string): string {
  return `${getCacheDir()}/${urlToCacheKey(url)}`
}

// 检查文件是否存在
function fileExists(path: string): Promise<boolean> {
  return new Promise((resolve) => {
    FS.access({
      path,
      success: () => resolve(true),
      fail: () => resolve(false),
    })
  })
}

// 下载并缓存图片
async function downloadAndCache(url: string): Promise<string> {
  await ensureCacheDir()

  const localPath = getLocalPath(url)

  try {
    // 直接请求文件内容，然后用 FS 写入（避免 downloadFile → saveFile 跨 temp 文件的问题）
    const res = await Taro.request<ArrayBuffer>({
      url,
      responseType: 'arraybuffer',
    })
    const arrayBuffer = res.data
    if (!arrayBuffer) throw new Error('request returned empty data')

    await new Promise<void>((resolve, reject) => {
      FS.writeFile({
        filePath: localPath,
        data: arrayBuffer as unknown as string,
        encoding: 'binary',
        success: () => resolve(),
        fail: (e) => {
          reject(e)
        },
      })
    })

    return localPath
  } catch (err) {
    throw err
  }
}

/**
 * 下载图片（如果本地已缓存则直接返回本地路径）
 * @param url 远程图片 URL
 * @returns Promise<本地路径>，下载失败时返回原始 URL（降级）
 */
export async function downloadIfNeeded(url: string): Promise<string> {
  if (!isRemoteUrl(url)) {
    // 本地路径直接返回
    return url
  }

  const localPath = getLocalPath(url)

  // 检查是否已缓存
  if (await fileExists(localPath)) {
    return localPath
  }

  // 未缓存，下载
  try {
    return await downloadAndCache(url)
  } catch {
    // 下载失败，降级到原始 URL
    return url
  }
}

/**
 * 清理图片缓存
 * @param url 可选，指定 URL 则只清理该图片，否则清全部
 */
export async function clearCache(url?: string): Promise<void> {
  if (url) {
    const localPath = getLocalPath(url)
    try {
      await new Promise<void>((resolve, reject) => {
        FS.unlink({
          filePath: localPath,
          success: () => resolve(),
          fail: (e) => {
            if (e.errMsg?.includes('file not found')) {
              resolve() // 不存在不报错
            } else {
              reject(e)
            }
          },
        })
      })
    } catch {}
  } else {
    // 清全部：删除整个缓存目录然后重建
    try {
      await new Promise<void>((resolve, reject) => {
        FS.rmdir({
          dirPath: getCacheDir(),
          recursive: true,
          success: () => resolve(),
          fail: (e) => {
            if (e.errMsg?.includes('no such file')) {
              resolve() // 目录不存在不报错
            } else {
              reject(e)
            }
          },
        })
      })
    } catch {}
    await ensureCacheDir()
  }
}

/**
 * 获取当前缓存总大小（字节）
 */
export async function getCacheSize(): Promise<number> {
  return new Promise((resolve, reject) => {
    FS.readdir({
      dirPath: getCacheDir(),
      success: async (res) => {
        let total = 0
        for (const file of res.files || []) {
          try {
            const stat = await new Promise<any>((res2, rej2) => {
              FS.stat({
                path: `${getCacheDir()}/${file}`,
                success: (s) => res2(s),
                fail: (e) => rej2(e),
              })
            })
            total += stat.size
          } catch {}
        }
        resolve(total)
      },
      fail: (err) => {
        // 目录不存在则大小为 0
        if (err.errMsg?.includes('no such file')) {
          resolve(0)
        } else {
          reject(err)
        }
      },
    })
  })
}

// 格式化字节大小
export function formatCacheSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}