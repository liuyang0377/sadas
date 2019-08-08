// pages/myIndex/myXinXi/myXinXi.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // items: [
    //   { id: "1", kname: "长沙", name: 'USA', value: '美国' },
    //   { id: "2", kname: "武汉", name: 'CHN', value: '中国' },
    //   { id: "3", kname: "唐山", name: 'BRA', value: '巴西' },
    //   { id: "4", kname: "保定", name: 'JPN', value: '日本' },
    //   { id: "5", kname: "北京", name: 'ENG', value: '英国' },
    //   { id: "6", kname: "天津", name: 'TUR', value: '法国' },
    // ]

  },
  open: function(e) {
    let that = this;
    let arrayItem = this.data.items;
    for (let i = 0; i < arrayItem.length; i++) {
      if (e.target.dataset.index == arrayItem[i].id) {
        if (arrayItem[i].isShow) {
          arrayItem[i].isShow = false
        } else {
          arrayItem[i].isShow = true
        }
      }
    }
    this.setData({
      items: arrayItem
    })
  },
  bindFormSubmit: function(e) {
    //console.log(e.detail.value.kaoqu)
    if (e.detail.value.kaoqu) {
      wx.navigateTo({
        url: '/pages/baokao/baokao?id=' + e.detail.value.kaoqu
      })
    } else {
      wx.showModal({
        content: '请先选择报名地点！',
        showCancel:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.request({
      url: app.getUrl() + '/student/xsbmJson', //仅为示例，并非真实的接口地址
      method: "Post",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //console.log(res.data)
        that.setData({
          items: res.data
        })
      }
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