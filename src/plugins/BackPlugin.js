import axios from 'axios';

export default {
  install: (Vue) => {
    const url = process.env.VUE_APP_BACK_URL;

    Vue.config.globalProperties.$back = axios.create({
      baseURL: `${url}/api`,
      withCredentials: true
    });
  }
}