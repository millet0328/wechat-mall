//app.js
// 导入API模块User 
import { User } from "./api/index.js";
// 导入服务器配置
import server from "./utils/server.js";

App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: async ({ code }) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let { status, token } = await User.token({ code });
        // 存储token
        if (status) {
          wx.setStorageSync("token", token);
        }
      }
    });
    // 获取授权
    wx.getSetting({
      success({ authSetting }) {
        // 未授权
        if (!authSetting['scope.userInfo']) {
          wx.setStorageSync('isAuth', false);
          return;
        }
        // 已授权
        wx.setStorageSync('isAuth', true);
        wx.getUserInfo({
          success({ userInfo }) {
            wx.setStorageSync('userInfo', userInfo);
          }
        });
      }
    })
  },
  globalData: {
    userInfo: null,
    ...server
  },
})