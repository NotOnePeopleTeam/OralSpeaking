Component({
    properties:{
        appiontmentData:{
            type: Object,
            value: "default value"
        }
    },
    data:{
        booleanMask:''
    },
    ready:function(options){
        console.log(`appointmentData:`,this.data);
    },
    methods: {
        confirm(){
            let booleanMask = false;
            this.setData({ booleanMask});
            this.triggerEvent("booleanPoint",{ booleanMask});
        },
        cancel(){
            let booleanMask = false;
            this.setData({ booleanMask});
            this.triggerEvent("booleanPoint",{ booleanMask});
        },
        clickMask(){
            let booleanMask = false;
            this.setData({ booleanMask});
            this.triggerEvent("booleanPoint",{ booleanMask});
        }
    }
})