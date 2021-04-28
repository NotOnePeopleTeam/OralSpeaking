// pages/otherPages/userProfile/refund/refund.js
const { loginCheck, getErr} = require('../../../../../utils/api');
const { upImg} = require('../../../../../utils/urls');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        examine:false, // false 表示还未提交审核！
        upImglist:[],
        areaText:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     *  图片点击上传
     */ 
    click_upload(){
        let _this = this;
        wx.showActionSheet({
          itemList: ['相册', '拍照'],
          itemColor: '#000000',
          success: (r) => {
              console.log(`click_upload`, r);
              if(!r.cancel){
                  if(r.tapIndex == 0){
                      wx.chooseImage({
                        count: 9,
                        sourceType: ['album'],
                        success:(r) => {
                            console.log(`album`,r);
                            let upImglist = _this.data.upImglist;
                            for(let  i=0; i < r.tempFilePaths.length; ++i){
                                upImglist.unshift(r.tempFilePaths[i]);
                            };
                            _this.setData({upImglist});
                        }
                      })
                  }else if(r.tapIndex == 1){
                      wx.chooseImage({
                        count: 1,
                        sizeType: ['original', 'compressed'],
                        sourceType: ['camera'],
                        success: (r) => {
                            console.log(`camera:`,r);
                            let upImglist = _this.data.upImglist;
                            for(let  i=0; i < r.tempFilePaths.length; ++i){
                                upImglist.unshift(r.tempFilePaths[i]);
                            };
                            _this.setData({upImglist});
                        }
                      })
                  }
              }
          }
        })
    },
    // 点击 取消
    close_concel(r){
        let { index} = r.currentTarget.dataset;
        let upImglist = this.data.upImglist;
        upImglist.splice( index, 1);
        this.setData({upImglist});
    },
    // 文本
    areaText(r){
        let areaText = r.detail.value;
        this.setData({areaText})
    },
    // 上传 资料
    submitCon(){
        let {areaText} = this.data;
        console.log(`areaText:`,areaText)
        let upImglist = this.data.upImglist;
        console.log(`upImglist:`,upImglist.length);
        if(upImglist.length > 0 && areaText != ''){
            for(let i=0; i<upImglist.length; ++i) {
                wx.showLoading({ title:`正在上传:${i}/${upImglist.length}`})
                let token = loginCheck();
                let TOKENNAME = "Authori-zation";
                let header = {
                    "Content-Type":`multipart/form-data`,
                    [TOKENNAME]: `Bearer ${token}`,
                };
                wx.uploadFile({
                  filePath: upImglist[i],
                  name: 'images',
                  url: upImg,
                  header,
                  formData: {
                    'images': upImglist[i]
                  },
                  success: (r) => {
                      console.log(`uploadFile:`,JSON.parse(r.data));
                      let exist = JSON.parse(r.data).status;
                      getErr(exist);
                      if(exist != 410000 && exist != 410001){
                        if(i + 1 == upImglist.length){
                            wx.hideLoading();
                            setTimeout(() => {
                                wx.showToast({
                                    title: `上传成功`,
                                });
                            },500);
                          }
                      }
                  }
                })
            }
        }else{
            wx.showToast({
              title: `内容和图册不能为空!`,
              icon:'none'
            })
        }
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