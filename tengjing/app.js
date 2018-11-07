//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    function getUserInfo() {
      //获取用户信息 得到 encryptedData iv等
      wx.getUserInfo({
        success: res => {
          // console.log(res);
          var encryptedData = res.encryptedData,
            iv = res.iv;
          // var pc = new WXBizDataCrypt(appId, sessionKey)

          // var data = pc.decryptData(encryptedData, iv)
        }
      })
    }
    //获取openid
    function getOpenid(code, encryptedData,iv){
      wx.request({
        // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.globalData.AppId + '&secret=' + that.globalData.App_secret + '&js_code=' + code + '&grant_type=authorization_code',
        url:'http://m.tjresearch.com/test/wx-tjresearch/getOpenId',
        data: {
          code: code,
          encryptedData: encryptedData,
          iv:iv
        },
        success: function (res) {
          // wx.showToast({title:res.data.unionId+''});
          if (res.data.unionid) {
            // that.setData({
            //   unionid:res.data.unionid
            // })
          } else {
            console.log("返回结果没有unionid");
          }
          // console.log(res.data);
          // 测试支付 传递openid
          if (res.data) {
            // return res.data.openid
            that.globalData.openid = res.data.openid;
          }
        },
        fail: res => {
          console.log("请求unionid失败")
        }
      })
    }
    

    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          // console.log(res.code);
          that.globalData.code = res.code;
          // 发送 res.code 到后台换取 openId, sessionKey, unionId

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // getOpenid(that.globalData.code, res.encryptedData,res.iv);
              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail:res=>{
              console.log("获取用户信息失败");
            }
          })
        }
      }
    })
  },
  globalData: {
    AppId: 'wxb3bcb59b7c49f7a4',
    App_secret: '931cadad3ed2838add7bc1955847bd8c',
    userInfo: null,
    unionid: '',
    openid:''
  }
})