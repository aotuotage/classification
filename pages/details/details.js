// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ptions = this.options;
    console.log(ptions.classid);
    wx.request({
      url: 'https://www.xinwanju.cn/garbage/getinfobyid', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "get",
      data: ptions.classid,
      success(res) {
        if (res.status !== 200) {
          _this.setData({
            errshow: true,
            errtext: "请求出错，请重新搜索。"
          });
          setTimeout(function () {
            _this.setData({
              errshow: false
            });
          }, 1500)
          return false;
        }
        _this.setData({
          list: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})