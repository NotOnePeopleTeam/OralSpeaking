const { fetch} = require(`../../utils/api`);
const { _language} = require(`../../utils/urls`);
Component({
    properties : {
        //  属性 
        language : {
            type : String,
            value : ''
        }
    },

    data : {
        //  数据
        language_all: [
            { id: 1, language_ch: "中文", language_en: "Chinese"}
        ],
        selected_id:0
    },
    ready : function (option){
        let url = _language;
        let method = `get`;
        let loading = false;
        let success = (r) => {
            console.log(`_language:`,r);
            let { language} = r.data.data;
            this.setData({ language_all: language});
        };
        let fail = (e) => {
            console.log(`_language_err:`,e);
        };
        let params = { url, method, loading, success, fail};
        fetch(params);
    },
    methods : {
        // 方法
        select(r){
            console.log(`select:`,r.currentTarget.dataset)
            let { id } = r.currentTarget.dataset;
            this.setData({selected_id: id});
            console.log(`language:`,this.data.selected_id)
            this.triggerEvent('courseLanguage',{ id})
        }
    }
})