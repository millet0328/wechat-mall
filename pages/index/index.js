// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authModalShow: false,
  },
  // 关闭弹窗
  closeModalHandle() {
    this.setData({
      authModalShow: false,
    })
  },
  // 授权成功
  authHandle(e) {
    this.closeModalHandle();
    wx.showTabBar();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isAuth = wx.getStorageSync('isAuth');
    // isAuth = true，已授权，authModalShow = false
    // isAuth = false/undefined，未授权，authModalShow = true
    this.setData({
      authModalShow: !isAuth,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})