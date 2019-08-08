// pages/myIndex/myXinXi/myXinXi.js
var app = getApp();
var dataAll;
var oldxinxi;
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
    let that = this;
    if (app.globalData.logins == true) {
      oldxinxi = wx.getStorageSync('xinxi'); //取出缓存data
      var data={
        "studentid": oldxinxi.id,
        "address":oldxinxi.address,
        "answer":oldxinxi.answer,
        "birthday":oldxinxi.birthday,
        "certificateNo":oldxinxi.certificateNo,
        "childRegionid":oldxinxi.childRegionid,
        "education":oldxinxi.education,
        "email":oldxinxi.email,
        "gender":oldxinxi.gender,
        "homeType":oldxinxi.homeType,
        "mphone":oldxinxi.mphone,
        "name":oldxinxi.name,
        "nation":oldxinxi.nation,
        "password":oldxinxi.password,
        "password2":oldxinxi.password2,
        "phone":oldxinxi.phone,
        "politics":oldxinxi.politics,
        "postCode":oldxinxi.postCode,
        "profession":oldxinxi.profession,
        "question":oldxinxi.question,
        "regionid":oldxinxi.regionid,
        "specialityRecordid":oldxinxi.specialityRecordid,
        "workAddress":oldxinxi.workAddress
      }
      dataAll = data
      wx.request({
        url: app.getUrl() + '/student/oldStudent/bkzyJson?studentid=' + dataAll.studentid, //仅为示例，并非真实的接口地址
        method: "Post",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          //console.log(res.data.bkzyList)
          that.setData({
            items: res.data.bkzyList
          })
          that.setData({
            value: '[' + (that.data.items[0].classify == '6' ? "专科" : "本科") + '] ' + that.data.items[0].name,
            specialityRecordid: that.data.items[0].specialityRecordid
          })
        }
      })
      //console.log(oldxinxi)
      //console.log(dataAll)
      //dataAll["specialityRecordid"] = this.data.specialityRecordid
    } else {
      dataAll = wx.getStorageSync('dataAll'); //取出缓存data
      wx.request({
        url: app.getUrl() + '/student/bkzyActionJson?childRegionid=' + dataAll.childRegionid, //仅为示例，并非真实的接口地址
        method: "Post",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          that.setData({
            items: res.data
          })
          that.setData({
            value: '[' + (that.data.items[0].classify == '6' ? "专科" : "本科") + '] ' + that.data.items[0].name,
            specialityRecordid: that.data.items[0].specialityRecordid
          })
        }
      })
    }


  },
  bindFormSubmit: function(e) {
    //console.log(e.detail.value.specialityRecordid)
    dataAll["specialityRecordid"] = this.data.specialityRecordid
    wx.setStorageSync('dataAll', dataAll)
    wx.navigateTo({
      url: '/pages/xkecheng/xkecheng?specialityRecordid=' + e.detail.value.specialityRecordid
    })
  },
  bindChange: function(e) {
    //这是返回的（被选择的）下标
    const index = e.detail.value
    this.setData({
      value: '[' + (this.data.items[index].classify == '6' ? "专科" : "本科") + '] ' + this.data.items[index].name,
      specialityRecordid: this.data.items[index].specialityRecordid
    })
  },
  back: function () {
    wx.switchTab({
      url: "/pages/pageIndex/pageIndex"
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})