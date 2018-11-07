// pages/news/news.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    news_list: [
      {
        "articleId": "01",
        "title": "库存充足，短期内动力没加承压明显",
        "content": "郑渊洁在其微博账号上发布消息称，多名读者向其举报拼多多上的“星宝宝家居生活专营店”销售盗版皮皮鲁图书，并向全国扫黄打非办公室与国家版权局举报维权，要求拼多多立即停止销售盗版图书并处罚关闭销售盗版图书的店铺。",
        "articleImg": "./../img/judg_article_list01.png",
        "publishTime": "2018年7月31日"
      },
      {
        "articleId": "01",
        "title": "中国最火消费降级：吃涪陵榨菜喝二锅头",
        "content": "前几年还是消费升级的概念，茅台，五粮液(72.150, -0.45, -0.62%)，进口商品，而今年生产二锅头的顺鑫农业(47.100, 2.14, 4.76%)和生产榨菜的涪陵榨菜的涨幅远远超过茅台五粮液，两者今年以来的平均涨幅竟然超过了100%，顺鑫农业今年2月最低点以来股价也飙升了200%左右，涪陵榨菜股价更是两年暴涨236%。",
        "articleImg": "./../img/judg_article_list02.png",
        "publishTime": "2018年7月31日"
      },
      {
        "articleId": "01",
        "title": "上拼多多！股价飙升200%！",
        "content": "3年前，消费最便宜的还是淘宝，3年后全国大多数人都知道了拼多多，这个靠拼购和低价起家，大多数商品比淘宝还便宜的购物平台。",
        "articleImg": "./../img/judg_article_list03.png",
        "publishTime": "2018年7月31日"
      },
      {
        "articleId": "01",
        "title": "积分落户初核结果今起可查询 最终得分预计四季度公布查询",
        "content": "据了解，本市积分落户工作分为申报、核查、复查、公示及落户办理四个阶段。7月31日至9月4日是复查阶段，在此期间，以配偶自有住所、在京投资企业纳税积分的，需现场审核夫妻关系证明、投资企业纳税情况。对合法稳定住所指标中的自有住所信息以及创新创业指标中的奖项信息、荣誉表彰指标荣誉称号信息初核结果有异议的，可提出一次复查申请。",
        "articleImg": "./../img/judg_article_list04.png",
        "publishTime": "2018年7月31日"
      },
      {
        "articleId": "01",
        "title": "17176.3亿元！今年上半年国企利润同比增长21.1%",
        "content": "2018年上半年，全国国有及国有控股企业经济运行态势良好。偿债能力和盈利能力比上年同期均有所提升，利润增幅高于收入10.9个百分点，利润增长21.1%。钢铁、有色、石油石化等行业利润大幅增长。",
        "articleImg": "./../img/judg_article_list05.png",
        "publishTime": "2018年7月31日"
      }
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,


    //切换栏
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData: [
      {
        text: '宏观'
      },
      {
        text: '区域'
      },
      {
        text: '钢铁'
      },
      {
        text: '煤炭'
      },
      {
        text: '房地产'
      },
      {
        text: '计算机'
      },
      {
        text: '互联网'
      },
      {
        text: '教育'
      },
      {
        text: '纺织'
      }
    ],
    currentTab: 0,
    navScrollLeft: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.redirectTo({
    //   url: 'www.baidu.com',
    // })
    /**
     * 获取系统信息
     */
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  tabScroll: (scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY) => {
    // console.log(this.data);
  },
  switchNav: function (event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.winWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab: function (event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.winWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  testPay: function () {
    console.log(app.globalData.openid);
    //测试支付
    // wx.request({
    //   url: 'http://m.tjresearch.com/test/wx-tjresearch/scanPayTest',
    //   data: {
    //     openId: app.globalData.openid
    //   },
    //   success: function (res) {
    //     if (res.data.retCode === "success") {
    //       var data = res.data.data;
    //       wx.requestPayment({
    //         'timeStamp': data.timeStamp,
    //         'nonceStr': data.nonceStr,
    //         'package': data.package,
    //         'signType': data.signType,
    //         'paySign': data.paySign,
    //         'success': function (res) {
    //           console.log(res);
    //         },
    //         'fail': function (res) {
    //         }
    //       })
    //     } else {
    //       console.log("传递openid失败")
    //     }
    //   }
    // })
  },
  newsListClick:function(event){
    var url =event.currentTarget.dataset.newsurl
    wx.navigateTo({
      url: '/pages/newsArticle/steelNews/index'
      // url: "https://www.tjresearch.cn"
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log("初次渲染完成")
    // this.data.news_list.forEach(function(){

    // })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("页面显示") 


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
    console.log("用户下拉")
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