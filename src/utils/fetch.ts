import axios, { AxiosRequestConfig } from 'axios'
import update from 'immutability-helper'

type AxiosRequestConfigForMerge = AxiosRequestConfig & { [prop: string]: any }

const mergeConfig = (baseConfig: AxiosRequestConfigForMerge, override: AxiosRequestConfigForMerge): AxiosRequestConfig => {
  let resConfig: AxiosRequestConfig = {};
  for (let index in override) {
    resConfig = update(baseConfig, {
      [index]: {
        $merge: baseConfig[index] === undefined ? override[index] : update(baseConfig[index], { $merge: override[index] })
      }
    })
  }
  return resConfig
}

const baseConfig: AxiosRequestConfig = {
  baseURL: '/api/v1/',
  transformResponse: [
    function (data: any) {
      return data
    }
  ],
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  // },
  timeout: 5000,
  responseType: 'json'
}


export function get(url: string, additionConfig?: AxiosRequestConfig) {
  const token = localStorage.getItem('token')
  const instance = axios.create(baseConfig);
  if (additionConfig) {
    return instance.get(url, mergeConfig(additionConfig, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }))
  } else {
    return instance.get(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }
}

export function post(url: string, data: any, additionConfig?: AxiosRequestConfig) {
  const token = localStorage.getItem('token')
  const instance = axios.create(baseConfig);
  if (additionConfig) {
    return instance.post(url, data, mergeConfig(additionConfig, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }))
  } else {
    return instance.post(url, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }
}

export function patch(url: string, data: any, additionConfig?: AxiosRequestConfig) {
  const token = localStorage.getItem('token')
  const instance = axios.create(baseConfig);
  if (additionConfig) {
    return instance.patch(url, data, mergeConfig(additionConfig, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }))
  } else {
    return instance.patch(url, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }
}