const { fetch, animations, getStorageTerm} = require(`../../utils/api`);
const { _teacherDetail} = require(`../../utils/urls`);

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tab:'date',
        up: false,
        slideUp:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let token = getStorageTerm(`token`);
        let TOKENNAME = "Authori-zation";
        let header = {
            "Content-Type":`multipart/form-data`,
            [TOKENNAME]: `Bearer ${token}`,
        };
        let { teacher_id, lan} = options;
        let url = `${_teacherDetail}?teacher_id=${teacher_id}`;
        let method = `get`;
        let success = r => {
            wx.hideLoading();
            let { avatar, nickname, teacher_info, uid} = r.data.data.teacher;
            this.setData({ avatar, nickname, teacher_info, uid, lan});
        };
        let loading = true;
        let params = { url, method, loading, header, success};
        fetch(params);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     *  组件通信
     */ 
    selectTime( r){
        console.log(`selectTime:`,r);
    },
    /**
     * 逻辑函数 
     */ 
    tabSelect(r){
        let { tab} = r.currentTarget.dataset;
        this.setData({ tab});
    },
    profileMore(r){
        console.log(`profileMore:`,r.currentTarget)
        let up = !this.data.up;
        wx.createSelectorQuery().select('.teacher').boundingClientRect( (r) => {
            console.log(`client:`,r);
            let {height } = r;
            this.setData({ height});
        }).exec();
        let h = this.data.height;
        this.setData({ up},animations( this, 'slideUp', h, 1));
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