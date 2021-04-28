// logs.js
const { fetch, getStorageTerm, storageTerm} = require("../../utils/api");
const { login } = require("../../utils/urls");

Page({
  data: {
    logs: []
  },
  onLoad() {
  },
  getUserInfo(){
    wx.getUserProfile({
        desc:  "用于完善会员资料",
        success: (r) => {
            let  { cloudID, encryptedData, iv, signature} = r;
            let { userInfo} = r;
            let infoData = { cloudID, encryptedData, iv, signature};
            let userFile = {...userInfo, ...infoData};
            let method = "post", url = login, loading = false, header= `application/x-www-form-urlencoded`,
                    success = (res) => {
                        wx.hideLoading();
                        let {token} = res.data.data;
                        storageTerm('setStorageSync', 'token', token, 7200);
                        let users = res.data.data.userInfo;
                        let user = { ...userFile, ...users};
                        wx.setStorageSync('user',[user]);
                    }, fail = (err) => {console.log(`err:`,err)};
            if(getStorageTerm("code")){
                let code = getStorageTerm("code");
                let data = { encryptedData, iv, username:userInfo.nickName, avatar:userInfo.avatarUrl, code};
                let params = { data, method, url, loading, header, success, fail};
                fetch(params);
            }else{
                wx.login({
                    success: res => {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        storageTerm('setStorageSync', 'code', res.code, 300);
                        let code = res.code;
                        let data = { encryptedData, iv, username:userInfo.nickName, avatar:userInfo.avatarUrl, code};
                        let params = { data, method, url, loading, header, success, fail};
                        fetch(params);
                    }
                })
            };
        }
    });
  },
  cancel(){
      wx.navigateBack();
  },
  clickMask(){
      wx.navigateBack();
  },
})
