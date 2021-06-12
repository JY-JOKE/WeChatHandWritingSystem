Page({
  data: {
    PageCur: 'basics'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: 'OCR文字识别',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})