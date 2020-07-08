// pages/user/address/list/index.js
import { Address } from '../../../../api/index.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  // 删除地址
  removeHandle({ target: { dataset: { id, index } } }) {
    wx.showModal({
      title: "确认",
      content: "确定要删除此地址？",
      success: async ({ confirm, cancel }) => {
        if (confirm) {
          let { status, msg } = await Address.remove(id);
          if (status) {
            wx.showToast({
              title: msg,
              icon: "none",
            });
            // 更新视图
            this.data.list.splice(index, 1);
            this.setData({
              list: this.data.list
            });
          }
        }
      }
    })
  },
  // 获取地址列表
  async loadList() {
    let { status, data } = await Address.list();
    if (status) {
      this.setData({
        list: data
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.loadList();
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