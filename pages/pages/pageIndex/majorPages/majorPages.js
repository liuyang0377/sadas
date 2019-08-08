let app = getApp();
const requestData = require('../../../utils/wxRequest.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.getUrl()+"/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //console.log(options.id)
    //调取专业接口
    wx.request({
      url: app.getUrl() + '/student/kskmJson', //仅为示例，并非真实的接口地址
      method: "Post",
      data: {
        specialityRecordid: options.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          zyjieshao: res.data
        })
      }
    })
    //调取专业介绍接口
    wx.request({
      url: app.getUrl() + '/student/getZyjs', //仅为示例，并非真实的接口地址
      method: "Post",
      data: {
        specialityRecordid: options.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        //console.log(res)
        that.setData({
          zyjsText: res.data.introduce,
          zyjsName: res.data.name
        })
      }
    })
    //调取专业对应院校图片和名称
    wx.request({
      url: app.getUrl() + '/student/zkyx', //仅为示例，并非真实的接口地址
      method: "Post",
      data: {
        specialityRecordid: options.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        //console.log(res.data)
        that.setData({
          yxLogo: res.data
        })
      }
    })
  },
  handleClick: function() {
    wx.reLaunch({
      url: '/pages/xkaoqu/xkaoqu'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})