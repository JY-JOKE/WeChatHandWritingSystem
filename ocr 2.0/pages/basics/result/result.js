// pages/basics/result/result.js
Page({
  data: {
    result:"",
    result_array:[],
    loading: true,
    suc: true,
    show_time: 0
  },
  getLocalImage:function(){
    var that = this;
    var arr = [];
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
          },
          fail(res){
          }
        })
        setTimeout(function(){
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //图片的相对路径
            encoding: 'base64', //base64编码
            success: res => {
              that.setData({
                image:"data:image/png;base64," + res.data
              })
            }
          })
          wx.cloud.callFunction({
          // 云函数名称
          name: 'func2',
          // 传给云函数的参数
          data: {
            image: that.data.image
          },
          success(res) {
            console.log(2)
            that.setData({
              result: res.result.TextDetections[0].DetectedText
            });
            for (var index in res.result.TextDetections){
              arr.push(res.result.TextDetections[index].DetectedText)
            }
            that.setData({
              result_array: arr
            });
            console.log(3)
            console.log(JSON.stringify(arr))
          },
          fail(res){
            console.log("fail"+res)
          }
        })
        },100)
      }
    })
  },
  onLoad: function (options) {
    this.getLocalImage()
 },
  onShow: function (options) {
    var that = this;
    var ld = that.data.loading;
    var time = that.data.show_time;
    if(time >= 1){
      setTimeout(function(){
        that.setData({
          loading: !ld
        })
        if(that.data.result != ""){
          that.setData({
            suc: true
          })
        }
        else{
          that.setData({
            suc: false
          })
        }
      }, 1500)
    }
    else{
      time += 1;
      console.log(time)
      that.setData({
        show_time: time
      })
    }
  },
  copy: function (e) {
    var that = this;
    var res = that.data.result_array
    wx.setClipboardData({
     data: `${res}`,
     success: function (res) {
       console.log("复制成功")
     }
    });
   },
})