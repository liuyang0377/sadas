let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.getUrl() + "/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    let xiangqing = JSON.parse(options.yxarry)
    //console.log(xiangqing)
    //console.log(xiangqing.id)
    this.setData({
      xiangqing: xiangqing
    });
    //开设专业
    wx.request({
      url: app.getUrl() + '/student/listZszy', //仅为示例，并非真实的接口地址
      method: "Post",
      data:{
        schoolid: xiangqing.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'// 默认值
      },
      success(res) {
        that.setData({
          kaisheZhuanye: res.data
        });
      }
    })
  },
  kaoshiPlan: function(even) {
    let id = even.target.dataset.id;
    let name = even.target.dataset.name;
    wx.navigateTo({
      url: '/pages/kaoshiPlan/kaoshiPlan?id=' + id + "&&name=" + name
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