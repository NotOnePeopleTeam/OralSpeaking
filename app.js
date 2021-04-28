// app.js
const { fetch, judgeNetwork, storageTerm } = require("./utils/api");
const { login} = require("./utils/urls");
App({
  onLaunch() {
    // 版本检测
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    };
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        storageTerm('setStorageSync', 'code', res.code, 300);
      }
    });
    // 登录检测
    wx.getSetting({
      success: res => {
        let that = this;
        if( res.authSetting["scope.userInfo"]){
        }else{
          that.globalData.LoginMask = true;
        };
      }
    });
    // teacher or student  role == 1   表示student   role == 2  表示teacher; 角色判定
    let role = 1;
    this.globalData.role = role;
    if(role == 1) {
      this.globalData.list = [
        {
          "iconPath": "/iamges/clock.png",
          "selectedIconPath": "/iamges/clock-icon.png",
          "text": "首页",
          "pagePath": "/pages/index/index",
          "role": 1
        },
        {
            "iconPath": "/iamges/date-fill.png",
            "selectedIconPath": "/iamges/date-fill-icon.png",
            "text": "课表",
            "pagePath": "/pages/index/timetable",
            "role": 2
        },
        {
            "iconPath": "/iamges/user.png",
            "selectedIconPath": "/iamges/user_icon.png",
            "text": "我的",
            "pagePath": "/pages/index/mine",
            "role": 2
        }
      ];
      
    }else if(role == 2){
      this.globalData.list = [
        {
          "iconPath": "/iamges/date-fill.png",
          "selectedIconPath": "/iamges/date-fill-icon.png",
          "text": "课表",
          "pagePath": "/pages/index/timetable",
          "role": 2
        },
        {
            "iconPath": "/iamges/user.png",
            "selectedIconPath": "/iamges/user_icon.png",
            "text": "我的",
            "pagePath": "/pages/index/mine",
            "role": 2
        }
      ];
      
    };
    // 网络检测
    judgeNetwork((r) => {if( 'none'  != r){return this.globalData.network = true;}});
  },
  globalData: {
    userInfo: null,
    list:[],
    selected: null,
    role: null,
    network:null,
    LoginMask: null
  }
})
