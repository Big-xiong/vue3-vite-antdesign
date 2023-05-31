import { onBeforeUnmount } from "vue"

/**
 * 
 * @param {时间格式} formatStr 
 * @param {时间} dateTime 
 * @returns 
 */
export function useFormatTime(formatStr,dateTime) {
  let date = new Date()
  let format = 'yyyy-MM-dd HH:mm:ss'
  if(dateTime) date = new Date(dateTime)
  if(formatStr) format = formatStr

  const week = ['一','二','三','四','五','六','日']
  const paddingZero = num => num >= 10 ? num : '0' + num;
  format = format.replace(/yyyy|YYYY/, date?.getFullYear());
  format = format.replace(/MM/, paddingZero(date?.getMonth() + 1));
  format = format.replace(/dd|DD/, paddingZero(date?.getDate()));
  format = format?.replace(/hh|HH/, paddingZero(date?.getHours()));
  format = format.replace(/星期/, `星期${week[date?.getDay()]}`);
  format = format.replace(/周/, `周${week[date?.getDay()]}`);
  format = format.replace(/mm/, paddingZero(date?.getMinutes()));
  format = format.replace(/ss/, paddingZero(date?.getSeconds()));
  format = format.replace(/SS/, paddingZero(date?.getMilliseconds()));

  return format;
}

/**
 * 
 * @param {socket地址} url 
 * @param {回传返回的msg} fn 
 * @returns 
 */
export function useWebSocket(url, fn) {
  let ws = new WebSocket(url);
  const wsInit = (cb) => {
    ws.onopen = wsOpen(cb)
    ws.onmessage = (e) => wsMessage(e)
    ws.onerror = wsError()
    ws.onclose = wsClose()
  }

  const wsOpen = (cb) => {
    console.log(`ws open`);
    // ws.send传参回调
    cb()
  }
  const wsMessage = (e) => {
    console.log(`ws msg`);
    fn(JSON.parse(e.data))
  } 
  const wsError = () => {
    console.log(`ws error`)
  }
  const wsClose = () => {
    console.log(`ws close`)
  }
  onBeforeUnmount(() => {
    ws.close()
    ws = null
  })

  return {
    ws,
    wsInit,
    wsOpen,
    wsMessage,
    wsClose,
    wsError,
  }
}