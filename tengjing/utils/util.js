var jumpIntervalMap = new Object();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const getTime = () => {
  var timeNow = new Date();
  var year = timeNow.getFullYear();
  var month = timeNow.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var date = timeNow.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var hours = timeNow.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var minutes = timeNow.getMinutes();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  var second = timeNow.getSeconds();
  if (second < 10) {
    second = '0' + second;
  }
  var untilDay = year + '-' + month + '-' + date;
  var untilSecond = hours + ':' + minutes + ':' + second;
  return {
    year: year,
    month: month,
    untilDay: untilDay,
    untilSecond: untilSecond
  }
};
const jumpChart = function(param) {
  //timeFlag为预测最后点向前推的月份数
  var that = this;
  
  var id = param.obj.id;
  var option = param.option;
  if (option.series.length != 0) {
    if (!option.series[1].data.length) { //单线无预测
      param.timeFlag = 18;
      var series0Len = option.series[0].data.length,
        sum = option.series[0].data.length
    } else { //有预测
      var series0Len = option.series[0].data.length,
        series1Len = option.series[1].data.length,
        sum = series0Len + series1Len;
    }
  }
  // 计算比例 并赋值给chartStart
  var chartStartV;
  var chartEnd = 100;
  if (option.series.length != 0) {
    var myJson = {};
    var series0Data = option.series[0].data;
    var series1Data = option.series[1].data;
    series0Data.forEach(function (item, index) {
      myJson[new Date(item[0])] = item[1];
    });
    series1Data.forEach(function (item, index) {
      myJson[new Date(item[0])] = item[1];
    });
    var timeArr = Object.keys(myJson);
    var currentTime = that.getTime().year + that.getTime().month;
    var historyTime;
    var index;
    for (var i = 0; i < timeArr.length; i++) {
      var year = new Date(timeArr[i]).getFullYear();
      var month = new Date(timeArr[i]).getMonth();
      if (month < 10) {
        month = '0' + month;
      }
      if (currentTime == year + '' + month) { //找到当前月在timeArr中的位置
        if (option.series[0].type === 'bar') { //有柱状图的情况下，sum不用减一
          var scale = (i - 6) / (sum + 1) * 100;
        } else { //其他情况下 去除最后一个历史值和第一个预测值月份相同的情况 
          var scale = (i - 6) / (sum - 1) * 100;
        }
        historyTime = timeArr[i - 7];
      }
      //只有预测时  显示12个月
      if (!series1Len) {
        // var chartStart = (sum-12)/(sum)*100;
        historyTime = timeArr[timeArr.length - 12]
      } else {
        var chartStart;
      }
    };
    var year = new Date(historyTime).getFullYear();
    var month = new Date(historyTime).getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var date = new Date(historyTime).getDate();
    chartStartV = year + '-' + month + '-' + date;
  }
  param.obj.on('datazoom', function (params) { //区域缩放后的事件，刷新起始时间
    // chartStart = params.startValue;
    chartStart = params.start;
    chartEnd = params.end;
  });

  //小折线图不显示预测之后六个月的markLine
  if (!param.isMarkLine) {
    if (option.series.length === 2) { //单线预测
      option.series[0].markLine.data.splice(1, 1);
    }
    if (option.series.length >= 4) { //单线预测
      option.series[3].markLine.data.splice(1, 1);
    }
  }
  param.obj.clear();
  var opacity = 1;
  var cssOpacity = 1;
  var flagOpcity = 2;
  var lenjump = option.series.length;
  ////时间更新
  var thisJumpInterval = jumpIntervalMap[id]

  if (thisJumpInterval) {
    clearInterval(thisJumpInterval);
  }
  thisJumpInterval = setInterval(function () {
    var count = Math.floor(Math.random() * 10 + 1) % 15;
    if (opacity == 1) {
      flagOpcity = 2;
    }
    if (opacity == 9) {
      flagOpcity = -2;
    }
    opacity += flagOpcity;
    opacity = opacity % 10;
    cssOpacity = opacity / 10;
    /*if(opacity == 1){
        opacity = 0;
    }else{
        opacity = 1;
    }*/
    for (var i = 0; i < lenjump; i++) {
      var indexOfStr = false;
      if (option.series[i].itemName) {
        for (var k = 0; k < param.arrStr.length; k++) {
          indexOfStr = indexOfStr || (option.series[i].itemName.indexOf(param.arrStr[k]) > 0)
        }
      }
      if (indexOfStr) {
        option.series[i].lineStyle = {
          normal: {
            opacity: cssOpacity,
          }
        };
      }
    }
    //刷新markLine当前时间点的显示
    if (option.series.length === 2) {
      option.series[0].markLine.data[0].xAxis = that.getTime().untilDay + ' ' + that.getTime().untilSecond;
    } else if (option.series.length >= 4) {
      if (option.series[0].type == 'bar') {
        option.series[3].markLine = {};
        option.series[3].markArea = {};
        option.series[2].markArea = {};
        option.series[1].markLine = {
          symbol: ['none', 'none'],
          silent: true,
          label: {
            normal: {
              show: true,
              formatter: that.getTime().untilDay
            }
          },
          lineStyle: {
            normal: {
              type: 'dotted',
              color: "#eeeeef",
              width: 2
            }
          },
          data: [{
            xAxis: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          }]
        };
        option.series[1].markArea = {
          silent: true,
          itemStyle: {
            normal: {
              color: 'rgba(255,255,255,0.6)',
              opacity: 0.1
            }
          },
          data: [
            [{
              xAxis: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
            }, {
              xAxis: 'max'
            }]
          ]
        };
      } else {
        option.series[3].markLine.data[0].xAxis = that.getTime().untilDay + ' ' + that.getTime().untilSecond;
      }
    }

    //添加datazoom组件
    if (param.isDataZoom) {
      option.dataZoom = [{
        show: false,
        type: 'inside',
        start: chartStart,
        end: chartEnd,
        startValue: chartStartV,
        zoomOnMouseWheel: false,
      },
      {
        height: 3,
        backgroundColor: '#B4B4B3',
        borderColor: 'transparent',
        fillerColor: '#00D8FF',
        showDetail: false,
        handleSize: 8,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleStyle: {
          color: '#00D8FF',
          shadowBlur: 8,
          shadowColor: '#4795B4',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        bottom: '1.5%',
        // left: '4%'
      }
      ];
    }
    //

    //调整中间大图的grid
    // option.dataZoom = {
    //     start: chartStart,
    //     end: chartEnd,
    // };
    // param.obj.hideLoading();
    param.obj.setOption(option);
  }, param.time);

  jumpIntervalMap[id] = thisJumpInterval;
}
//获取当前时间 返回年月日时分秒

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  jumpChart: jumpChart,
  getTime:getTime
}
