// component/auth-modal/index.js
import { User } from '../../api/index';

Component({
	/**
	 * 组件的属性列表
	 */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    }
  },

	/**
	 * 组件的初始数据
	 */
  data: {

  },

	/**
	 * 组件的方法列表
	 */
  methods: {
    async	handleGetUserInfo({ detail: { encryptedData, iv, errMsg, userInfo } }) {
      if (errMsg == "getUserInfo:fail auth deny") {
        wx.showToast({
          title: '未授权获取用户信息！',
          icon: 'none'
        });
        return false;
      }
      // 上传账户信息
      let { status, msg } = await User.info(userInfo);
      if (status) {
        // 缓存授权状态
        wx.setStorageSync("isAuth", true);
        // 缓存userInfo
        wx.setStorageSync("userInfo", userInfo);
        // 将获取的userInfo传递出去
        this.triggerEvent('permit', userInfo);
      }
    },
    handleReject () {
      // 缓存授权状态
      wx.setStorageSync("isAuth", false);
      this.triggerEvent('reject');
    }
  },
  lifetimes: {
    ready: function () {
      // 在组件实例进入页面节点树时执行
      let { isShow } = this.data;
      if (isShow) {
        wx.hideTabBar();
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      wx.showTabBar();
    },
  },
})
