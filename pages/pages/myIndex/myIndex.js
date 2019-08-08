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
  onLoad: function (options) {
    
  },
  myXinxi:function(){
    if (getLogin.globalData.logins == false) {
      wx.navigateTo({
        url: '/pages/myIndex/login/login',
      })
    }else{
      wx.navigateTo({
        url: '/pages/myIndex/myXinXi/myXinXi',
      })
    }  
  },
  mychengji: function () {
    if (getLogin.globalData.logins == false) {
      wx.navigateTo({
        url: '/pages/myIndex/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/myIndex/myRecord/myRecord',
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})