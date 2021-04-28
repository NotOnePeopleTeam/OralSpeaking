/**- wechat request encapsulation-**/ 

//  request
const fetch = ( params ) => {
    let data  = params.data;
    let method  =  params.method || "get";
    let url = params.url;
    let loading = params.loading;
    return new Promise( (response, reject) => {
        loading ? wx.showLoading({
          mask: false
        }) : null ;
        wx.request({
          data,
          method,
          url,
          header: params.header || {
              Accept: "application/json","Content-Type":"application/json"
          },
          success: params.success,
          fail: ( err ) => {
            console.log(`requestErr:`,err)
            setTimeout(() => { wx.hideLoading();}, 1000);
            if(params.fail){params.fail()};
            reject(err);
          },
          complete: () => {

          }
        })
    })
};
// urlsErr - check request url
const urlsErr = (c) => {
  let e = c, n = new Map([ [502, "Bad Gateway!"], [404, "Not Found!"]]);
  return new Promise(() => {
    wx.showToast({
      title: n.get(e),
      icon: `none`
    })
  })
};
// loginCheck
const loginCheck = () => {
  if(getStorageTerm(`token`)){
    return getStorageTerm(`token`);
  }else{wx.navigateTo({
    url: `/pages/logs/logs`,
  })}
};
// upLoadImage
const upLoadImage = ( params) => {
    let url = params.url;
    let method = params.method || "get";
    let loading = params.loading || true;
    let data = params.data;
    let path = params.path;
    let success = (res) => {
        loading ? wx.hideLoading() : null;
        wx.uploadFile({
          filePath: path,
          name: 'file',
          url,
        })
    };
    let fail = (err) => {
      setTimeout(() => { wx.hideLoading();}, 2000);
      console.log(`err:`,err);
    };
    let complete = () => {
        console.log(`uploadimage is ok!`)
    }
    return new Promise((response, reject) => {
      loading ? wx.showLoading({
        mask: false
      }) : null ;
        wx.request({
            url,method,data,
            header: params.header || {
              Accept: "application/json","Content-Type":"application/json"
            },
            success,
            fail,
            complete,
          })
    })
};
// timerFormat
const timeFormat = (t, b) => {
    function e(t) {
      return t < 10 ? "0" + t.toString() : t.toString(); 
    };
    function l(u) {
      u = u.toString();
      return u[1] ? u : `0${u}`
    };
    let n = new Date(t), y = n.getFullYear(), m = n.getMonth() + 1, d = n.getDate(), w = n.getDay(), h = n.getHours(), i = n.getMinutes(), s = n.getSeconds(),
        f = e( n.getMinutes()), u = (n.getSeconds(), new Date()), r = 0;
    if(b) {
      return r = Date.now() - t, r <= 60 ? "刚刚" : 6e4 < r && r <= 3600 ? Math.round(r / 60) + "分钟前" : 3600 < r && r <= 3600 * 24 ? Math.round(r / 3600) + "小时前" : 3600 * 24 < r && r <= 1296000 ? Math.round(r / (3600 * 24)) + "天前" : r > 1296000 && o == u.getFullYear() ? m + "-" + d + " " + e(h) + ":" + f : y + "-" + m + "-" + d + " " + e(h) + ":" + f;
    }else{
      return `${[y, m, d].map(l).join('/')}${[h, i, s].map(l).join(':')}`;
    }
};
// date - week 
const getWeek = (t) => {
  let e = null;
  if ( "string" != typeof t && "number" != typeof t ) return t;
  let w = ( t  = new Date(t)).getDay();
  return  0 == w && (e == "星期日"),
          1 == w && (e == "星期一"),
          2 == w && (e == "星期二"),
          3 == w && (e == "星期三"),
          4 == w && (e == "星期四"),
          5 == w && (e == "星期五"),
          6 == w && (e == "星期六");
};
// date - mouth  
const getMouth = (t) => {
  return t ? [ "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二" ][new Date(t).getMonth()] + "月" : t;
};
// err - code - collection -check login
const getErr = (c) => {
  let e = c, n = new Map([ [410000, "未登录"],[410001, "登录已过期,重新登录"] ]);
  return wx.showToast({
    title: n.get(e),
    icon: "none",
    success:  () => {
      setTimeout(() => {
        wx.navigateTo({
          url: `/pages/logs/logs`,
        })
      },1000)
    }
  })
};
// the future time conctroller
const futureDay = (n) => {
  let t = new Date();
  let e = new Date().getFullYear();
  let d = new Date(t.setDate(t.getDate() + n)).getDate();
  let m = t.getMonth() + 1;
  let w = t.getDay();
  let i = t.getDay();
  let y = `${e}${m < 10 ? `0`+ m : m}${d < 10 ? `0`+ d : d}`;
  switch( w){
    case 0: w = "日";
    break;
    case 1: w = "一";
    break;
    case 2: w = "二";
    break;
    case 3: w = "三";
    break;
    case 4: w = "四";
    break;
    case 5: w = "五";
    break;
    case 6: w = "六";
    break;
  };
  return {
    d, m, w, i, y
  }
};
// next week
const futureWeek = (o) => {
  let a = [];
  for( let i=0; i <= o; ++i ) {
    a.push(futureDay(i))
  };
  return a;
};
// animations
const animations = (t, p, h, o) => {
  let duration = 500, timingFunction = 'ease';
  let j = '{"'+ p +'":""}';
  let animation = wx.createAnimation({
    duration, timingFunction
  });
  return new Promise(() => {
    animation.translateY(h).opacity(o).step();
    j = JSON.parse(j);
    j[p] = animation.export();
    t.setData({j})
  })
};
// judgeNetwork
const judgeNetwork = (c) => {
  wx.getNetworkType({
    success: (r) => {
      let n = r.networkType;
      if( "none" == n){
        wx.showLoading({
          title: `暂无网络`,
          mask: false
        });
        judgeNetwork(c);
      } else {
        wx.hideLoading();
        c(n);
      }
    },
    fail:(e) => {
      console.log(`err:`,e)
    }
  })
};
// storageTerm  --> 时效缓存
const storageTerm = (s,k, v, m) => {
  let t = m ? m : 3600;
  let e = parseInt(t);
  let i = Date.parse(new Date()) / 1000 + e;
  switch(s){
    case s == "setStorageSync" :
      wx.setStorageSync(k, v);
      break;
    case s == "setStorage" :
      wx.setStorage({ key: k, data: v});
      break;
    default :  wx.setStorageSync(k, v);
      break;
  };
  if(e > 0) { s == "setStorageSync" ? wx.setStorageSync(k + "dt", i + "") : wx.setStorage({key: k + "dt",data: i + ""})}
  else{ 
    switch(s){
      case s == "setStorageSync" :
        wx.removeStorageSync(k + "dt", i + "");
        break;
      case s == "setStorage" :
        wx.removeStorage({ key: k + "dt",data: i + ""});
        break;
      default :
        break;
    };
  };
};
// getStorageTerm --> 读取时效缓存
const getStorageTerm = (k) => {
  if(!!wx.getStorageSync(k + 'dt') || !wx.getStorage({key: k+'dt'})){
    var dt = wx.getStorageSync(k + 'dt') || wx.getStorage({key: k+'dt'}) ;
  }else{var dt = false}
  if (dt) {
    if(parseInt(dt) < Date.parse(new Date()) / 1000){wx.removeStorageSync( k+ 'dt');wx.removeStorage({key:k + 'dt'});}
    else{
      let r = wx.getStorageSync(k) || wx.getStorage({key:k});
      if(r) {return r;}else{return false;};
    }
  }else{
    return false;
  };
};
// clearStorage
const clearStorage = () => { wx.clearStorage(); wx.clearStorageSync()};
// 抛出 module
module.exports = {
  fetch, upLoadImage, timeFormat, getWeek, getMouth, getErr, futureDay, futureWeek, animations, judgeNetwork, storageTerm, getStorageTerm,
  clearStorage, loginCheck, urlsErr
}