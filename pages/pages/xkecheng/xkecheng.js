// pages/myIndex/myXinXi/myXinXi.js
var app = getApp();
var dataAll;
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
    dataAll = wx.getStorageSync('dataAll'); //取出缓存data
    let that = this;
    wx.request({
      url: app.getUrl() + '/student/kskmJson?specialityRecordid=' + options.specialityRecordid, //仅为示例，并非真实的接口地址
      method: "Post",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var item = res.data
        for (let i = 0; i < res.data.length; i++) {
          item[i].examDate = res.data[i].examDate.split(" ")[0]
        }
        that.setData({
          items: item
        })


      }
    })
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
    dataAll["examCourseid"] = e.detail.value.examCourseid0.split(',')[0] + ',' + e.detail.value.examCourseid1.split(',')[0] + ',' + e.detail.value.examCourseid2.split(',')[0] + ',' + e.detail.value.examCourseid3.split(',')[0];
    wx.setStorageSync('dataAll', dataAll); //将data存入本地缓存
    const dataAll2 = JSON.stringify(dataAll)
    const value = JSON.stringify(e.detail.value)
    wx.navigateTo({
      url: '/pages/ExhiBition/ExhiBition?data=' + dataAll2 + '&&value=' + value
    })
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})