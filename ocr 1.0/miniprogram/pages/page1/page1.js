// pages/page1/page1.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    result:"初始值",
    display_result:false,
    image:"初始值"
  },
  getLocalImage:function(){
    var that=this;
    var dr = this.data.display_result;
    wx.chooseImage({
      count:1,
      success:function(res){
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //图片的相对路径
          encoding: 'base64', //base64编码
          success: res => {
            that.setData({
              image:"data:image/png;base64," + res.data
            })
          }
        })
        // 上传文件到腾讯云，调用api
        wx.cloud.callFunction({
          // 云函数名称
          name: 'func2',
          // 传给云函数的参数
          data: {
            image: that.data.image
          },
          success(res) {
            console.log(res.result.TextDetections[0].DetectedText);
            that.setData({
              display_result: !dr,
              result: res.result.TextDetections[0].DetectedText
            });
            console.log(that.data.result);
          },
          fail: console.error
        })
      }
    })
  }
})