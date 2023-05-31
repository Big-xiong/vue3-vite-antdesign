import axios from 'axios'

const instance = axios.create({
	baseURL:'http://8.134.57.215',
	timeout: 2000,        
})


instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return error
})
 
instance.interceptors.response.use((response) => {
  if (response.code === 200 ) {
    return response.data
  } else {
    return response
  }
}, (error) => {
  return error
})

export default instance