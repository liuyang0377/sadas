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

  },
  formSubmit: function(e) {
    if (e.detail.value.username == "" || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e.detail.value.username)) {
      wx.showToast({
        title: '证件号码不能为空或者证件号码格式错误！',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.password == ""){
      wx.showToast({
        title: '密码不能为空！',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.request({
        url: app.getUrl() + '/student/oldStudent/loginInfo', //仅为示例，并非真实的接口地址
        method: "Post",
        data: {
          username: e.detail.value.username,
          password: e.detail.value.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          var data = res.data
          if (data ==''){
            wx.showToast({
              title: '身份证或密码填写错误！',
              icon: 'none',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '登录成功！',
              icon: 'none',
              duration: 1000
            })
            var data = JSON.stringify(data)
            wx.setStorageSync("loginData", data)
            setTimeout(function () { 
              // wx.navigateTo({
              //   url: '/pages/myIndex/myXinXi/myXinXi?data=' + data,
              // })
              wx.switchTab({
                url: '/pages/pageIndex/pageIndex',
              })
            }, 1500);
            app.globalData.logins = true;//改变app.js下控制是否跳转登陆页面
            //console.log(app.globalData.logins)
          }
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})