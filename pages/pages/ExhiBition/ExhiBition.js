let app = getApp();
var dataAll;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logins:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(app.globalData.logins)
    //控制ExhiBition提交页面显示个人信息用
    if (app.globalData.logins==true){
      this.setData({
        logins:false
      })
    }else{
      this.setData({
        logins: true
      })
    }
    const that = this;
    const data = JSON.parse(options.data)
    const value = JSON.parse(options.value)
    this.setData({
      itemData: data,
      examCourseid0: value.examCourseid0.split(',')[1],
      examCourseid1: value.examCourseid1.split(',')[1],
      examCourseid2: value.examCourseid2.split(',')[1],
      examCourseid3: value.examCourseid3.split(',')[1],
    })
    wx.request({
      url: app.getUrl() + '/student/xiaLaJson', //仅为示例，并非真实的接口地址
      method: "Post",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        const gender = res.data.stu_student_gender
        for (let i = 0; i < gender.length; i++) {
          if (data.gender == gender[i].id) {
            that.setData({
              _gender: gender[i].name
            })
          }
        }
        const education = res.data.stu_student_speciality_education
        for (let i = 0; i < education.length; i++) {
          if (data.education == education[i].id) {
            that.setData({
              education: education[i].name
            })
          }
        }
        const profession = res.data.stu_student_profession
        for (let i = 0; i < profession.length; i++) {
          if (data.profession == profession[i].id) {
            that.setData({
              profession: profession[i].name
            })
          }
        }
        const homeType = res.data.stu_student_home_type
        for (let i = 0; i < homeType.length; i++) {
          if (data.homeType == homeType[i].id) {
            that.setData({
              homeType: homeType[i].name
            })
          }
        }
        const politics = res.data.stu_student_politics
        for (let i = 0; i < politics.length; i++) {
          if (data.politics == politics[i].id) {
            that.setData({
              politics: politics[i].name
            })
          }
        }
        const nation = res.data.stu_student_nation
        for (let i = 0; i < nation.length; i++) {
          if (data.nation == nation[i].id) {
            that.setData({
              nation: nation[i].name
            })
          }
        }
      }
    })
    wx.request({
      url: app.getUrl() + '/student/xsbmJson', //仅为示例，并非真实的接口地址
      method: "Post",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < res.data[i].regionList.length; j++) {
            if (data.childRegionid == res.data[i].regionList[j].id) {
              that.setData({
                childRegionid: res.data[i].regionList[j].name
              })
            }
          }
        }
      }
    })
  },
  baokao: function() {
    dataAll = wx.getStorageSync('dataAll'); //取出缓存data
    if (app.globalData.logins == true) {
      wx.request({
        url: app.getUrl() + '/student/oldStudent/saveInfoJson', //仅为示例，并非真实的接口地址
        method: "Post",
        data: {
          "examCourseid": dataAll.examCourseid,
          "studentid": dataAll.studentid,
          "specialityRecordid": dataAll.specialityRecordid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res.data)
          if (res.data == "报考成功！") {
            wx.showToast({
              title: '报考成功！',
              icon: 'success',
              duration: 1500
            })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/pageIndex/pageIndex',
              })
            }, 1500);
          } else {
            wx.showToast({
              title: '报考失败！',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    } else {
      wx.request({
        url: app.getUrl() + '/student/saveInfoJson', //仅为示例，并非真实的接口地址
        method: "Post",
        data: dataAll,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          if (res.data == "ok") {
            wx.showToast({
              title: '报考成功！',
              icon: 'success',
              duration: 1500
            })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/pageIndex/pageIndex',
              })
            }, 1500);
          } else {
            wx.showToast({
              title: '报考失败！',
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    }

  },
  uploadImage: function() {
    var _this = this;
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success(res) {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     const tempFilePaths = res.tempFilePaths
    //     console.log(res)
    //     _this.setData({
    //       img_l: res.tempFilePaths
    //     })
    //   }
    // })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})