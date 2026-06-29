import { Image, View } from '@tarojs/components'
import { useState, useEffect, memo, type CSSProperties } from 'react'
import { downloadIfNeeded, isRemoteUrl } from '../../services/imageCache'
import './index.scss'

interface CachedImageProps {
  src?: string | null
  mode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top left' | 'top right' | 'bottom left' | 'bottom right'
  lazyLoad?: boolean
  showMenuByLongpress?: boolean
  className?: string
  style?: string | CSSProperties
  onClick?: () => void
  onLoad?: (e: any) => void
  onError?: (e: any) => void
}

function CachedImage({
  src,
  mode,
  lazyLoad = false,
  showMenuByLongpress = false,
  className = '',
  style,
  onClick,
  onLoad,
  onError,
}: CachedImageProps) {
  const [displaySrc, setDisplaySrc] = useState<string>('')
  const [ready, setReady] = useState(false)
  const originalSrc = src || ''

  useEffect(() => {
    if (!originalSrc) {
      setDisplaySrc('')
      setReady(false)
      return
    }

    if (!isRemoteUrl(originalSrc)) {
      setDisplaySrc(originalSrc)
      setReady(true)
      return
    }

    // 远程 URL：先清空显示 placeholder，等缓存解析完成
    setDisplaySrc('')
    setReady(false)

    let cancelled = false
    ;(async () => {
      const localPath = await downloadIfNeeded(originalSrc)
      if (cancelled) return
      setDisplaySrc(localPath)
      setReady(true)
    })()

    return () => {
      cancelled = true
    }
  }, [originalSrc])

  const handleLoad = (e: any) => {
    onLoad?.(e)
  }

  const handleError = (e: any) => {
    // 下载失败时，降级到原始 URL 让 Image 自己处理错误状态
    if (displaySrc && displaySrc !== originalSrc) {
      setDisplaySrc(originalSrc)
      setReady(true)
    }
    onError?.(e)
  }

  return (
    <View
      className={`cached-image ${ready ? 'cached-image--ready' : ''} ${className}`}
      style={style}
      onClick={onClick}
    >
      {displaySrc ? (
        <Image
          className='cached-image__img'
          src={displaySrc}
          mode={mode}
          lazyLoad={lazyLoad}
          showMenuByLongpress={showMenuByLongpress}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <View className='cached-image__placeholder' />
      )}
    </View>
  )
}

export default memo(CachedImage)
