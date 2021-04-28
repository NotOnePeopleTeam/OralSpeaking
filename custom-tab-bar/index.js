const app = getApp();
const { loginCheck} = require(`../utils/api`);
Component({
    data: {
        selected: 0,
        color: "#666666",
        selectedColor: "#f45f7f",
        list: app.globalData.list,
    },
    attached(){
        this.setData({ list: app.globalData.list});
    },
    methods: {
        switchTab( r) {
            let selected = r.currentTarget.dataset.index;
            wx.setStorageSync('selected', selected);
            let  url = this.data.list[selected].pagePath;
            if(loginCheck()){
                wx.switchTab({ url,});
            }
        }
    }
})