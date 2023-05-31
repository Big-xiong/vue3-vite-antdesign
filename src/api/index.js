import request from "../utils/request";

export function setDefaultReminder(data) {
  return request({
    method: 'post',
    url: '/api/pati/bedScreenBind/setDefaultReminder',
    data
  })
}