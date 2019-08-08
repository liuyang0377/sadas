let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    var id = wx.getStorageSync('xinxi').id
    wx.request({
      url: app.getUrl() + '/student/oldStudent/scoreListByStudentid', //仅为示例，并非真实的接口地址
      method: "Post",
      data:{
        studentid: "121118200073"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        that.setData({
          grade: res.data
        })
      }
    })
  },
  fanhui: function() {
    wx.navigateBack({})

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})