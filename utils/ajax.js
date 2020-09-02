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
      Authorization: `Bearer ${token}`,
    };
    // 拼接完整api地址
    url = server.api + url;
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method,
        header: { ...headerConfig, ...config },
        success({ statusCode, data }) {
          // 隐藏loading
          wx.hideLoading();
          switch (statusCode) {
            case 200:
              resolve(data);
              break;
            case 401:
              wx.showToast({
                title: '错误码：401，无权限访问此API接口',
                icon: "none",
              });
              reject(data);
              break;
            case 404:
              wx.showToast({
                title: '错误码：404，API接口地址错误！',
                icon: "none",
              });
              reject();
              break;
            case 500:
              wx.showToast({
                title: '错误码：500，服务器错误！',
                icon: "none",
              });
              reject();
              break;
            default:
              break;
          }
        }
      });
    });
    return promise;
  },
  get(url, data) {
    return this.ajax({ url, data, method: "GET" })
  },
  post(url, data) {
    return this.ajax({ url, data, method: "POST" })
  },
  put(url, data) {
    return this.ajax({ url, data, method: "PUT" })
  },
  delete(url, data) {
    return this.ajax({ url, data, method: "DELETE" })
  },
}

export default request