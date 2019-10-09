export function isArray (v) {
  const t = Object.prototype.toString.apply(v)
  return t === '[object Array]'
}
export function isString (v) {
  const t = Object.prototype.toString.apply(v)
  return t === '[object String]'
}

export function formatDate (date, fmt) {
  const v = new Date(date)
  let o = { 
    "M+" : v.getMonth()+1,                 //月份 
    "d+" : v.getDate(),                    //日 
    "h+" : v.getHours(),                   //小时 
    "m+" : v.getMinutes(),                 //分 
    "s+" : v.getSeconds(),                 //秒 
    "q+" : Math.floor((v.getMonth()+3)/3), //季度 
    "S"  : v.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (v.getFullYear() + "").substr(4 - RegExp.$1.length))
  }

  for(let k in o) {
    if(new RegExp("("+ k +")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
    }
  }

  return fmt;
}