let app = getApp();
let getLogin = getApp();
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
    this.setData({
      height: 2*wx.getSystemInfoSync().screenHeight,
      width: 2*wx.getSystemInfoSync().screenWidth
    })
    //console.log(getLogin.globalData.logins)
    if (getLogin.globalData.logins == true) {
      wx.redirectTo({
        url: '/pages/xzhuanye/xzhuanye',
      })
    }
  },
  onShow: function () {
    this.onLoad()
  },
  newlogin:function(){
    wx.navigateTo({
      url: '/pages/xkaoqu/xkaoqu',
    })
  },
  oldlogin:function(){
    wx.navigateTo({
      url: '/pages/myIndex/login/login',
    })
  }
})