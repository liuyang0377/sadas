// pages/myIndex/myXinXi/myXinXi.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderArray: [],
    genderObjectArray: [],
    genderIndex: 0,
    educationArray: [],
    educationObjectArray: [],
    educationIndex: 0,
    professionArray: [],
    professionObjectArray: [],
    professionIndex: 0,
    homeTypeArray: [],
    homeTypeObjectArray: [],
    homeTypeIndex: 0,
    politicsArray: [],
    politicsObjectArray: [],
    politicsIndex: 0,
    nationArray: [],
    nationObjectArray: [],
    nationIndex: 0,
    dateValue: '2019-1-1'
  },
  //日期选择
  datePickerBindchange: function(e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
  //性别
  genderBindchange: function(e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  //文化程度
  educationBindchange: function(e) {
    this.setData({
      educationIndex: e.detail.value
    })
  },
  //职业
  professionBindchange: function(e) {
    this.setData({
      professionIndex: e.detail.value
    })
  },
  //户籍
  homeTypeBindchange: function(e) {
    this.setData({
      homeTypeIndex: e.detail.value
    })
  },
  //政治面貌
  politicsBindchange: function(e) {
    this.setData({
      politicsIndex: e.detail.value
    })
  },
  //民族
  nationBindchange: function(e) {
    this.setData({
      nationIndex: e.detail.value
    })
  },
  //验证手机号
  checkPhone: function(value) {
    if (value.detail.value) {
      if (!(/^1[3456789]\d{9}$/.test(value.detail.value))) {
        wx.showToast({
          title: '手机号码有误，请重填',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
  },
  bindFormSubmit: function(e) {
    if (e.detail.value.name == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.certificateNo == "" || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(e.detail.value.certificateNo)) {
      wx.showToast({
        title: '证件号码不能为空或者证件号码格式错误！',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.mphone == "") {
      wx.showToast({
        title: '请输入联系手机',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.password == "") {
      wx.showToast({
        title: '请输入报考密码',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.password2 == "") {
      wx.showToast({
        title: '请输入确认密码',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.password2 != e.detail.value.password) {
      wx.showToast({
        title: '请确认两次密码输入一致',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.mphone != "") {
      if (!(/^1[3456789]\d{9}$/.test(e.detail.value.mphone))) {
        wx.showToast({
          title: '手机号码有误，请重填',
          icon: 'none',
          duration: 2000
        })
      } else {
        //身份证去重
        wx.request({
          url: app.getUrl() + '/student/chenkIdCard?certificateNo=' + e.detail.value.certificateNo, //仅为示例，并非真实的接口地址
          method: "Post",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if (res.data.msg > 0) {
              wx.showToast({
                title: '身份证重复,该学生已报考！',
                icon: 'none',
                duration: 2000
              })
            } else {
              //将学生信息整个对象保存到缓存里
              wx.setStorageSync('dataAll', e.detail.value); //将data存入本地缓存
              wx.showToast({
                title: '提交成功！',
                icon: 'none',
                duration: 2000
              })
              setTimeout(function() {
                wx.navigateTo({
                  url: '/pages/xzhuanye/xzhuanye'
                })
              }, 2000);
            }
          }
        })

      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let val = options.id.split(",")
    //console.log(val)
    this.setData({
      id: val[0],
      kqName: val[1],
      regionid: val[2]
    })
    wx.request({
      url: app.getUrl() + '/student/xiaLaJson', //仅为示例，并非真实的接口地址
      method: "Post",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //性别
        const gender = res.data.stu_student_gender
        that.setData({
          genderObjectArray: gender
        })
        const obj = [];
        for (let i = 0; i < gender.length; i++) {
          obj.push(gender[i].name)
        }
        that.setData({
          genderArray: obj
        })
        //文化程度
        const education = res.data.stu_student_speciality_education
        that.setData({
          educationObjectArray: education
        })
        const obj2 = [];
        for (let i = 0; i < education.length; i++) {
          obj2.push(education[i].name)
        }
        that.setData({
          educationArray: obj2
        })
        //职业
        const profession = res.data.stu_student_profession
        that.setData({
          professionObjectArray: profession
        })
        const obj3 = [];
        for (let i = 0; i < profession.length; i++) {
          obj3.push(profession[i].name)
        }
        that.setData({
          professionArray: obj3
        })
        //户籍
        const homeType = res.data.stu_student_home_type
        that.setData({
          homeTypeObjectArray: homeType
        })
        const obj4 = [];
        for (let i = 0; i < homeType.length; i++) {
          obj4.push(homeType[i].name)
        }
        that.setData({
          homeTypeArray: obj4
        })
        //政治面貌
        const politics = res.data.stu_student_politics
        that.setData({
          politicsObjectArray: politics
        })
        const obj5 = [];
        for (let i = 0; i < politics.length; i++) {
          obj5.push(politics[i].name)
        }
        that.setData({
          politicsArray: obj5
        })
        //民族
        const nation = res.data.stu_student_nation
        that.setData({
          nationObjectArray: nation
        })
        const obj6 = [];
        for (let i = 0; i < nation.length; i++) {
          obj6.push(nation[i].name)
        }
        that.setData({
          nationArray: obj6
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