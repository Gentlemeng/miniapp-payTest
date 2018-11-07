//index.js
import * as echarts from '../ec-canvas/echarts.min';
const util = require('../../utils/util.js')

//获取应用实例
const app = getApp()

function getLineOption() {
  
  return {
    "tooltip": {
      "trigger": "axis",
      "axisPointer": {
        "show": true,
        "type": "line",
        "label": {
          "show": true
        },
        "lineStyle": {
          "type": "solid",
          "width": 1
        }
      },
      "showDelay": 0,
      "backgroundColor": "rgba(0,0,0,0.3)"
    },
    "grid": {
      "containLabel": true,
      "bottom": "bottom",
      "left": "center",
      "width": "90%",
      "height": "78%"
    },
    "dataZoom": {
      "show": false
    },
    "xAxis": {
      "type": "time",
      "position": "bottom",
      "axisLabel": {
        "margin": 10,
        "textStyle": {
          "color": "#b4b4b4",
          "fontSise": 10
        }
      },
      "axisLine": {
        "lineStyle": {
          "color": "#9c9ca0",
          "width": 1,
          "type": "solid"
        }
      },
      "axisTick": {
        "show": false,
        "alignWithLabel": true,
        "inside": true
      },
      "splitLine": {
        "show": false
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": ["rgba(144,238,144,0.3)", "rgba(135,200,250,0.3)"]
        }
      }
    },
    "yAxis": [{
      "type": "value",
      "nameGap": 10,
      "scale": true,
      "splitNumber": 4,
      "boundaryGap": false,
      "axisLabel": {
        "margin": 12,
        "color": "#b4b4b4",
        "fontFamily": "arial",
        "fontWeight": "bolder",
        "fontSise": 10
      },
      "axisLine": {
        "show": false,
        "lineStyle": {
          "color": "#ddd",
          "width": 1,
          "type": "solid"
        }
      },
      "axisTick": {
        "onGap": false,
        "show": false
      },
      "splitArea": {
        "show": false
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": "#62636d"
        }
      },
      "axisPointer": {
        "show": false
      },
      "name": "(%)"
    }, {
      "type": "value",
      "scale": true,
      "splitNumber": 4,
      "axisLabel": {
        "margin": 12,
        "color": "#b4b4b4",
        "fontFamily": "arial",
        "fontWeight": "bolder",
        "fontSise": 10
      },
      "axisLine": {
        "show": false,
        "lineStyle": {
          "color": "#ddd",
          "width": 1,
          "type": "solid"
        }
      },
      "axisTick": {
        "onGap": false,
        "show": false
      },
      "splitArea": {
        "show": false
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": "#62636d"
        }
      },
      "axisPointer": {
        "show": false
      }
    }],
    "series": [{
      "name": "VA",
      "itemName": "VA历史",
      "type": "line",
      "showAllSymbol": false,
      "symbol": "circle",
      "symbolSize": 4,
      "data": [
        ["2018-03-31T00:00:00.000Z", 6.59877723],
        ["2018-04-30T00:00:00.000Z", 6.509647176],
        ["2018-05-31T00:00:00.000Z", 6.566072641],
        ["2018-06-30T00:00:00.000Z", 6.693993148],
        ["2018-07-31T00:00:00.000Z", 6.775989904]
      ],
      "smooth": true,
      "itemStyle": {
        "normal": {
          "color": "#3acfff",
          "lineStyle": {
            "width": 2,
            "type": "solid"
          }
        }
      },
      "markArea": {
        "silent": true,
        "itemStyle": {
          "normal": {
            "color": "rgba(90,90,100,.3)"
          }
        },
        "data": [
          [{
            "xAxis": "2018-09-05T07:52:34.095Z"
          }, {
            "xAxis": "3000-01-01"
          }]
        ]
      },
      "yAxisIndex": 0,
      "markLine": {
        "symbol": ["none", "none"],
        "silent": true,
        "label": {
          "normal": {
            "show": true
          }
        },
        "lineStyle": {
          "normal": {
            "type": "dotted",
            "color": "#eeeeef",
            "width": 2
          }
        },
        "data": [{
          "name": "当前markLine"
        }, {
          "name": "预测markLine",
          "xAxis": "2018-03-05"
        }]
      }
    }, {
      "name": "VA",
      "itemName": "VA预测",
      "type": "line",
      "showAllSymbol": false,
      "symbol": "circle",
      "symbolSize": 4,
      "data": [
        ["2018-07-31T00:00:00.000Z", 6.775989904],
        ["2018-08-31T00:00:00.000Z", 6.073850896],
        ["2018-09-30T00:00:00.000Z", 5.387156393],
        ["2018-10-31T00:00:00.000Z", 4.671507318],
        ["2018-11-30T00:00:00.000Z", 4.130093866],
        ["2018-12-31T00:00:00.000Z", 3.857613516],
        ["2019-01-31T00:00:00.000Z", 3.82318727],
        ["2019-02-28T00:00:00.000Z", 3.889368853],
        ["2019-03-05T00:00:00.000Z", 3.890556969935484]
      ],
      "smooth": true,
      "itemStyle": {
        "normal": {
          "color": "#3acfff",
          "lineStyle": {
            "width": 2,
            "type": "solid"
          }
        }
      },
      "markArea": {
        "silent": true,
        "itemStyle": {
          "normal": {
            "color": "rgba(90,90,100,.3)"
          }
        },
        "data": [
          [{
            "xAxis": "2018-09-05T07:52:34.095Z"
          }, {
            "xAxis": "3000-01-01"
          }]
        ]
      },
      "yAxisIndex": 0
    }],
    "legend": {
      "show": true,
      "left": "6%",
      "top": 0,
      "data": ["VA", "VA", ""],
      "textStyle": {
        "color": "#fff"
      }
    }
  }
}
Page({
  // onShareAppMessage: function (res) {
  //   return {
  //     title: 'ECharts 可以在微信小程序中使用啦！',
  //     path: '/pages/index/index',
  //     success: function () { },
  //     fail: function () { }
  //   }
  // },
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ecVA: {
      onInit: function (canvas, width, height) {
        const macroVachart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(macroVachart);
        var option = getLineOption();
        macroVachart.setOption(option);
        // util.jumpChart({
        //   obj: macroVachart,
        //   arrStr: ['预测'],
        //   time: 100,
        //   option: option,
        //   isDataZoom: false,
        //   isMarkLine: false,
        //   percentAge: '0'
        // });
        return macroVachart;
      }
    },
    macroIndexTabData: [
      {
        text: 'VA'
      },
      {
        text: 'PPI'
      },
      {
        text: 'PROF'
      },
      {
        text: 'GFP'
      },
      {
        text: 'OPI'
      },
      {
        text: 'EXP'
      },
      {
        text: 'IC'
      },
    ],
    navScrollLeft: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function () {
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
  },
  getUserInfo: function(e) {
    // console.log(e)
    //用户允许获取信息
    if(e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    //用户拒绝获取信息
    else{
      wx.showModal({
        title: '请允许授权，否则功能使用受限',
        showCancel:false,
      })
    }
  },
  //拖动指标tab
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
})
