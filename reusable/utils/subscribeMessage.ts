import Taro from '@tarojs/taro'

export async function requestSubscribePermission(templateId: string): Promise<boolean> {
  try {
    const res = await new Promise<Record<string, any>>((resolve) => {
      // @ts-ignore
      if (typeof wx !== 'undefined' && wx.requestSubscribeMessage) {
        // @ts-ignore
        wx.requestSubscribeMessage({
          tmplIds: [templateId],
          success: (result: any) => resolve(result),
          fail: (result: any) => resolve(result),
        })
        return
      }

      // 非小程序环境（H5/开发工具 mock）默认放行，避免阻塞流程。
      resolve({ errMsg: 'requestSubscribeMessage:ok', [templateId]: 'accept', mock: true })
    })

    if (res.errMsg !== 'requestSubscribeMessage:ok') {
      Taro.showToast({ title: '订阅授权失败', icon: 'none' })
      return false
    }
    if (res[templateId] !== 'accept') {
      Taro.showToast({ title: '未授权订阅消息', icon: 'none' })
      return false
    }
    return true
  } catch {
    Taro.showToast({ title: '订阅授权失败', icon: 'none' })
    return false
  }
}
