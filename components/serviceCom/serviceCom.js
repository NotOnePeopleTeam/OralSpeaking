Component({
    properties:{
        service:{
            type: Object,
            value: "default value"
        }
    },
    data:{
        booleanMask:''
    },
    ready:function(options){
        console.log(`service:`,this.data);
    },
    methods: {
        confirm(){
            let booleanMask = false;
            this.setData({ booleanMask});
            this.triggerEvent("booleanService",{ booleanMask});
        },
        cancel(){
            let booleanMask = false;
            this.setData({ booleanMask});
            this.triggerEvent("booleanService",{ booleanMask});
        },
        clickMask(){
            let booleanMask = false;
            this.setData({ booleanMask});
            this.triggerEvent("booleanService",{ booleanMask});
        },
        copyText(r){
            let { text} = r.currentTarget.dataset;
            wx.setClipboardData({
              data: text,
              success: (res) => {
                  wx.getClipboardData({
                    success: () => { wx.showToast({
                        icon: 'none',
                        title: '复制成功'
                    })},
                  })
              }
            })
        }
    }
})