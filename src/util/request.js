/**
 * Created by xiaolei on 2018/4/18.
 */
import axios from 'axios';
import defaultModule
  from '../components/Module/defaultModule/defaultModule'
import { hashHistory } from 'react-router'
import LoadingFun
  from '../components/Module_Loading/Loading'
import qs from 'qs'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return checkDadiCode(response.data)
  }

  const errorText = codeMessage[ response.status ] || response.statusText;
  const error = new Error(errorText);
  error.name = response.status;
  error.response = response;
  throw error;
}

function checkUrl(project, url) {
  let newProject;
  if (window.location.origin.indexOf('localhost') !== -1 || window.location.origin.indexOf('127.0.0.1') !== -1) {
    newProject = checkProject(project).devUrl
  } else if (window.location.origin.indexOf('test') !== -1) {
    newProject = checkProject(project).testUrl
  } else {
    newProject = checkProject(project).proUrl
  }
  return { url: newProject + url }
}

function checkProject() {
  let newProject;

  newProject = {
    testUrl: 'http://bot.testing2.ifchange.com',
    proUrl: 'http://bot.testing2.ifchange.com',
    devUrl: 'http://bot.testing2.ifchange.com'
  };
  return newProject;
}

function checkDadiCode(data) {
  switch ( data.code ) {
    case "9000":
      hashHistory.push('/');
      break;
    case "0000":
      return data;
      break;
    case "8000":
      defaultModule("提示", data.message, false, 1)
      const errorText = codeMessage[ data.message ] || "";
      const error = new Error(errorText);
      error.name = data.message;
      error.response = data;
      throw error;
      break;
    default:
      return data;
      break;
  }

}

export default function request(options) {
  const defaultOptions = {
    method: 'post'
  };
  if (options.method === "GET") {
    options.url = options.url+'?'+qs.stringify(options.data);
  }
  const newOptions = { ...defaultOptions, ...options, ...checkUrl(options.project, options.url) };
  if (newOptions.method === "POST" || newOptions.method === "GET") {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers = {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...newOptions.headers,
      };
      newOptions.data = qs.stringify(newOptions.data, { arrayFormat: 'repeat' });
      // newOptions.data = (newOptions.data);
    } else {
      newOptions.headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers,
      };
    }
  }

  // LoadingFun();
  // console.log(newOptions);
  return axios(newOptions).then(checkStatus).then((response) => {
    // LoadingFun(false);
    console.log(response);
    return response.response
  }).catch(e => {
    // LoadingFun(false);
    console.log(e.name, e.response)
  })
}