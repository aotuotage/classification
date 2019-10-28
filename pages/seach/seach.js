// pages/seach/seach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      name:'手机',
      classification:'石腊吉',
      classid:"7777"
    }],
    errtext:"",
    errshow:false
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindKeyInput:function(e){
    this.setData({
      invalue: e.detail.value
    })
  },
  search:function(){
    let _this = this;
    if (!_this.data.invalue){
      _this.setData({
        errshow:true,
        errtext:"垃圾名称不能为空"
      });
      setTimeout(function(){
        _this.setData({
          errshow: false
        });
      },1500)
      return false;
    };
    wx.request({
      url: 'https://www.xinwanju.cn/garbage/getidbyname', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "get",
      data: _this.data.invalue,
      success(res) {
        if (res.status !== 0){
          _this.setData({
            errshow: true,
            errtext: "未搜到结果，快去贡献词条吧！"
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