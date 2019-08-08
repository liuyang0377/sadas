function requestData(url, result) {
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    method: "Post",
    data: {
      offset: 0,
      limit: 2
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success(res) {
      //console.log(res)
      result(res)
    }
  })
}

function request(url, result) {
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    method: "Post",
    header: {
      'content-type': 'application/json'// 默认值
    },
    success(res) {
      //console.log(res)
      result(res)
    }
  })
}
module.exports = {
  requestData: requestData,
  request: request
}