let app = getApp();
const requestData = require('../../utils/wxRequest.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.getUrl() + "/",
    current: 1,
    loadmoreHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    //专业
    requestData.request(app.getUrl() + '/student/listZszy', function (res) {
      //console.log(res.data)
      that.setData({
        zymc: res.data
      })
    })
    //院校
    requestData.requestData(app.getUrl() + '/student/zkyxList', function(res) {
      //console.log(res.data)
      that.setData({
        yxmc: res.data
      })
    })


  },
  //切换active
  switchSlider: function(event) {
    this.setData({
      current: event.target.dataset.index
    })
  },
  //切换专业和院校
  changeSlider: function(event) {
    this.setData({
      current: event.detail.current
    })
  },
  //专业详情跳转
  linkZhuanye: function(event) {
    let id = event.target.dataset.index
    wx.navigateTo({
      url: '/pages/pageIndex/majorPages/majorPages?id=' + id
    })
  },
  //院校详情跳转
  linkyuanxiao: function(event) {
    let that = this
    let index = event.currentTarget.dataset.index
    let yxArry = that.data.yxmc[index]
    yxArry = JSON.stringify(yxArry); 
    //console.log(event.currentTarget.dataset.index)
    //console.log(yxArry)
    wx.navigateTo({
      url: '/pages/pageIndex/schoolPages/schoolPages?yxarry=' + yxArry
    })
  },
  //下拉加载
  actionTolower: function(event) {
    var that = this
    this.setData({
      loadmoreHidden: false
    });
    
    requestData.requestData(app.getUrl() + '/student/zkyxList', function(res) {
      setTimeout(function() {
        that.setData({
          loadmoreHidden: true,
          yxmc: that.data.yxmc.concat(res.data),
        });
      }, 1000);
    })


  },
  handleClick: function() {
    console.log(1)
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
    console.log(111111111)
  }
})