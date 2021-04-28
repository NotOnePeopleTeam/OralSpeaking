const { futureWeek} = require(`../../utils/api.js`);

Component({
    properties: {
      // 这里定义了innerText属性，属性值可以在组件使用时指定
      course_date: {
        type: String,
        value: 'default value',
      }
    },
    data: {
      // 这里是一些组件内部数据
      someData: {},
      title : "我的课表",
      today:null
    },

    ready : function () {
      let week = futureWeek(6);
      let timeForm = week[0].y;
      let today  = new Date().getDate();
      this.setData({
        week, today
      });
      this.triggerEvent("courseTime",{today, timeForm});
    }, 

    methods: {
      fetchDate(r){
        console.log(`fetchDate:`,r.currentTarget.dataset)
        let  today = r.currentTarget.dataset.currentdate;
        let index = r.currentTarget.dataset.index;
        let timeForm = this.data.week[index].y;
        this.setData({ today});
        this.triggerEvent("courseTime",{today, timeForm});
      }

    }
  })