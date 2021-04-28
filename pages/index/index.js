// index.js
// 获取应用实例
const app = getApp();
const {fetch, loginCheck} = require(`../../utils/api`);
const { _teacherList} = require(`../../utils/urls`);

Page({
  data: {
    language_id: 1 + '',
    day: '',
    page: 0,
    limit:  20,
    teachers:[]
  },
  onLoad() {
    
  },
  onReady(){
    let { language_id, page, limit} = this.data;
    let day = `20210423`;
    let datas = { language_id, day, page, limit};
    this.initData(datas);

  },
  // 首页数据
  initData(datas){
    let url = _teacherList;
    let method = `get`;
    let data = datas;
    let loading = false;
    let success = r => {
      console.log(`teacher:`,r.data.data.teachers);
      let teachers = r.data.data.teachers.map( i => {
        let lan = i.lan,
          nickname = i.nickname,
          avatar = i.avatar,
          teacher_info = i.teacher_info,
          teacher_id = i.teacher_id;
        return {lan, nickname, avatar, teacher_info, teacher_id};
      });
      console.log(`teachers:`,teachers)
      this.setData({teachers});
    };
    let params = { data, url, method, loading, success};
    fetch(params);
  },
  // 接收 组件通信值
  selectLanguage(r){
    let { id} = r.detail;
    this.setData({ language_id: id});
  },
  selectTime(r){
    let day = r.detail.timeForm;
    this.setData({day});
  },

  /**
   * 页面跳转 Lesson_Details
  */
 Lesson_Details( r){
   let { url } = r.currentTarget.dataset;
   if(loginCheck()){
    wx.navigateTo({ url,});
   }
 },
  //
  onShow(){
    wx.setStorageSync('selected', 0);
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({selected: wx.getStorageSync('selected')});
    }
  }
})
