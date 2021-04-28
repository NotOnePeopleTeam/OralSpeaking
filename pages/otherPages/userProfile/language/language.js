// pages/otherPages/userProfile/language/language.js
const { fetch} = require(`../../../../utils/api`);
const { _language} = require(`../../../../utils/urls`);
Page({

    /**
     * 页面的初始数据
     */
    data: {
        language: [
            { id: 1, language_ch: "中文", language_en: "Chinese"},
            { id: 2, language_ch: "英文", language_en: "English"}
        ],
        selected_id:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    // 语言切换
    translate_language(r) {
        let { id } = r.currentTarget.dataset;
        this.setData({selected_id: id});
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