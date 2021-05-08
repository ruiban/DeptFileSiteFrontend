import axios from 'axios'
import router from '../router/index.js'
import {Message} from 'element-ui'


let base = process.env.API_HOST;
//let base = '/DeptFileSite';  //正式使用
//let base = '/api';  //测试使用
export const postRequest = (url, params) => {
	return axios({
		method: 'post',
		url: `${base}${url}`,
		data: params,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		transformRequest: [function (data) {
			let ret = ''
		    for (let it in data) {
		       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		    }
			return ret
		}],
		withCredentials: true
		
	});
}

export const uploadFileRequest = (url,params) => {
	return axios({
		method: 'post',
		url: `${base}${url}`,
		data: params,
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: true
	});
}

export const downloadRequest = (url, params) => {
	return axios({
		method: 'post',
		url: `${base}${url}`,
		data: params,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		responseType: 'blob',
		transformRequest: [function (data) {
			let ret = ''
		    for (let it in data) {
		       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		    }
			return ret
		}],
		withCredentials: true
	});
}

export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    /*transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],*/
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    withCredentials: true
  });
}

export const getRequest = (url,params) => {
  return axios({
    method: 'get',
    data:params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    url: `${base}${url}`,
    withCredentials: true
  });
}

//响应拦截
axios.interceptors.response.use(success => {
    if (success.status && success.status == 200 && success.data.status == 500) {
        return;
    }
    if (success.data.msg) {
        
    }
    return success;
}, error => {
    if (error.status == 504 || error.status == 404) {
        //Message.error({message: '根本找不到服务器!'});
    } else if (error.status == 403) {
        //资源不可用或没有权限
        Message.error({message: '尚无权限!'});
    } else if (error.status == 401) {
        //未登录
        Message.error({message: '尚未登录，请先登录!'});
        router.replace('/');
    } else {
        
    }
    return error;
})

