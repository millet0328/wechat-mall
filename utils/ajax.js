// 导入服务器配置
import server from './server.js';
// 封装ajax
// option = {url,data,method,config}
let request = {
  ajax({ url, data, method, config }) {
    // 显示loading,在请求中...
    wx.showLoading({ title: '加载中...' });
    // 获取token
    let token = wx.getStorageSync('token');
    // 设置头部信息header
    let headerConfig = {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    // 拼接完整api地址
    url = server.api + url;
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method,
        header: Object.assign({}, headerConfig, config),
        success({ statusCode, data }) {
          // 隐藏loading
          wx.hideLoading();
          if (statusCode == 200) {
            resolve(data);
          } else {
            //错误信息处理
            wx.showModal({
              title: '提示',
              content: '服务器错误，请联系客服',
              showCancel: false,
            })
          }
        }
      });
    });
    return promise;
  },
  post(url, data) {
    return this.ajax({ url, data, method: "POST" })
  },
  get(url, data) {
    return this.ajax({ url, data, method: "GET" })
  },
  put(url, data) {
    return this.ajax({ url, data, method: "PUT" })
  },
  delete(url, data) {
    return this.ajax({ url, data, method: "DELETE" })
  },
}

export default request