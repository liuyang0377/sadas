// pages/myIndex/myXinXi/myXinXi.js
let loginsPanD = getApp();
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
    //接收个人信息
    if (wx.getStorageSync('xinxi')) {
      this.setDatas(wx.getStorageSync('xinxi'))
    } else {
      var loginData = wx.getStorageSync('loginData')
      var data = JSON.parse(loginData)
      this.setDatas(data)
      wx.setStorageSync('xinxi', data)
    }
  },
  setDatas: function (data) {
    this.setData({
      xinxi: data
    })
    var birthday = this.data.xinxi.birthday
    var birthday2 = birthday.substring(0, 10)
    this.setData({
      birthday: birthday2
    })
  },
  fanhui: function() {
    // wx.navigateBack({
    //   delta: 2
    // })
    wx.switchTab({
      url: '/pages/myIndex/myIndex'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})