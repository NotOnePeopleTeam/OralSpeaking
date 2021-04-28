// pages/mine/mine.js
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
        let route = getCurrentPages()[getCurrentPages().length - 1].route;
        let service = { route};
        this.setData({ service});
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let { avatarUrl, nickName} = wx.getStorageSync('user')[0];
        this.setData({ avatarUrl, nickName});
    },
    /**
     *   页面跳转函数 
     */ 
    userClickRoute(r){
        let { url} = r.currentTarget.dataset;
        wx.navigateTo({ url});
    },
    /**
     * 组件通信 
     */ 
    serviceBtn(){
        this.setData({ booleanMask:true});
    },
    serviceClick(r){
        console.log(`serviceClick:`,r);
        let booleanMask = r.detail.booleanMask;
        this.setData({ booleanMask});
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if(typeof this.getTabBar === 'function' && this.getTabBar()){
          this.getTabBar().setData({selected: wx.getStorageSync('selected') });
        };
        let { avatarUrl, nickName} = wx.getStorageSync('user')[0];
        this.setData({ avatarUrl, nickName});
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