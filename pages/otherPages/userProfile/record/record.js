// pages/otherPages/userProfile/record/record.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        star:'/iamges/star.png',
        star_none:'/iamges/star-none.png',
        count: -1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     *  点击 star 评价 
     */
    clickStar(r){
        console.log(`clickStar:`,r);
        let { count} = r.currentTarget.dataset;
        this.setData({ count});
    },
    Refund(r){
        let {url} = r.currentTarget.dataset;
        console.log(`Refund`,url,r)
        wx.navigateTo({url});
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