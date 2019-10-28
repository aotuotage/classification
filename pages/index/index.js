//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '家庭垃圾分类帮手',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    texttitle:"有害垃圾：",
    textcontent:"指废纸张、废塑料、废玻璃制品、废金属、废织物等适合回收、可循环利用的生活废弃物。",
    textnotes:"注意轻放，已破损物应该包裹后投放，废弃药品宜带包装一并投放，杀虫剂等压力罐容器应排空后投放。",
    mask:false,
    qRCodeMsg: "",
    array: [],
    index:0,
    pickershow:true,
    restest:''
  },
  getQRCode: function () {
    var _this = this;
    wx.scanCode({        //扫描API
      success: function (res) {
        console.log(res);    //输出回调信息
        _this.setData({
          qRCodeMsg: res.result
        });
        wx.showToast({
          title: '成功',
          duration: 2000
        })
      }
    })
  },
  submission(){
    console.log(555)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value,
      pickershow: false
    })
  },
  onLoad: function () {
    //右上角分享
    wx.showShareMenu({
      withShareTicket: true
    })
    //载入userinfo信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
       
        }
      })
    }
    let _this = this;
    wx.request({
      url: 'https://openwall.top/garbage/info/1', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        _this.setData({
          restest: res.data.data.classification
        })
      }
    })
    //初始化垃圾分类名称显示
    let userdata = wx.getStorageSync('userInfo')
    console.log(userdata)
    if (userdata) {
      if (userdata.province == 'Beijing') {
        this.setData({
          array: ['有害垃圾', '可回收垃圾', '厨余垃圾', '其他垃圾']
        })
      } else if (userdata.province == 'Shanghai') {
        this.setData({
          array: ['有害垃圾', '可回收垃圾', '湿垃圾', '干垃圾']
        })
      } else {
        this.setData({
          array: ['有害垃圾', '可回收垃圾', '易腐垃圾', '其他垃圾']
        })
      }
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync('userInfo',app.globalData.userInfo)
    //初始化垃圾分类名称显示
    let userdata = wx.getStorageSync('userInfo')
    if (userdata) {
      if (userdata.province == 'Beijing') {
        this.setData({
          array: ['有害垃圾', '可回收垃圾', '厨余垃圾', '其他垃圾']
        })
      } else if (userdata.province == 'Shanghai') {
        this.setData({
          array: ['有害垃圾', '可回收垃圾', '湿垃圾', '干垃圾']
        })
      } else {
        this.setData({
          array: ['有害垃圾', '可回收垃圾', '易腐垃圾', '其他垃圾']
        })
      }
    }
  },
  sharebtn:function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  recyclablebtn:function(){
    this.setData({
      mask:true,
      texttitle:"有害垃圾：",
      textcontent:"指废电池、废灯管、废药品、废油漆及其容器等对人体健康或者自然环境造成直接或者潜在危害的生活废弃物。",
      textnotes:"注意轻放，已破损物应该包裹后投放，废弃药品宜带包装一并投放，杀虫剂等压力罐容器应排空后投放。"
    })
  },
  harmfulbtn: function () {
    this.setData({
      mask: true,
      texttitle: "可回收物：",
      textcontent: "指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物。",
      textnotes: "尽量保持清洁干燥，避免污染。废纸应保持平整。包装物应清空清洁后，压扁投放。废玻璃制品应轻投轻放。锐利物品包裹后投放。"
    })
  },
  wetbtn: function () {
    let texttitle;
    let textcontent;
    if (app.globalData.userInfo.province =='Beijing'){
      texttitle = '厨余垃圾：';
      textcontent = "即易腐垃圾，指食物废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。";
    } else if (app.globalData.userInfo.province == 'Shanghai'){
      texttitle = '湿垃圾：';
      textcontent = "即易腐垃圾，指食物废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。";
    } else{
      texttitle = '易腐垃圾：';
      textcontent = "指食物废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。";
    }
    this.setData({
      mask: true,
      texttitle: texttitle,
      textcontent: textcontent,
      textnotes: "应与产生时就与其他垃圾分开，尽量沥干水分投放。垃圾袋包装袋等容器投放时应去除。"
    })
  },
  drybtn: function () {
    let texttitle;
    let textcontent;
    if (app.globalData.userInfo.province == 'Beijing') {
      texttitle = '其它垃圾：';
      textcontent = "指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。";
    } else if (app.globalData.userInfo.province == 'Shanghai') {
      texttitle = '干垃圾：';
      textcontent = "即其它垃圾，指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。";
    } else {
      texttitle = '其它垃圾：';
      textcontent = "指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。";
    }
    this.setData({
      mask: true,
      texttitle: texttitle,
      textcontent: textcontent,
      textnotes: "应投入指定垃圾收集容器，并保持周边环境整洁。"
    })
  },
  close:function(){
    this.setData({
      mask: false
    })
  },
  maskbtn:function(e){
    console.log(e.target.id);
    if (e.target.id !== 'maskcontent' && e.target.id !== 'maskcontent2' && e.target.id !== 'maskcontent3' && e.target.id !== 'maskcontent4'){
      this.setData({
        mask: false
      })
    }
  }
})
