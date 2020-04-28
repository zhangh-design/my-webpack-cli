import LoaderApiLibrary from 'axios-api-query'
import { USER_API_CONFIG, USER_AXIOS_CONFIG } from '@config/index.js'
// 拦截器
import {
  apiRequestStartHandler,
  apiRequestEndHandler,
  apiRequestInterceptErrorHandler
} from '@/config/interceptors/api.js'
// 载入配置的所有 api 接口模型
import ApiConfig from '@service/api/index.js'

const Loader = new LoaderApiLibrary(
  ApiConfig,
  USER_API_CONFIG,
  USER_AXIOS_CONFIG
)
// 全局钩子函数
window.apiRequestStartHandler = apiRequestStartHandler
window.apiRequestEndHandler = apiRequestEndHandler
window.apiRequestInterceptErrorHandler = apiRequestInterceptErrorHandler

export const api = Loader.api
