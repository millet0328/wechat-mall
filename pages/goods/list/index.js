// pages/goods/list/index.js

import { Goods } from '../../../api/index.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    id: '', //分类id
    pageIndex: 1, //当前第几页
    isEnd: false,//是否无新数据
  },
  // 获取商品列表
  async loadList() {
    // 当前第几页，分类id
    let { pageIndex, id } = this.data;
    let { status, goods } = await Goods.list({ pageIndex, pageSize: 6, cate_3rd: id });
    if (status) {
      // 暂无新数据
      if (goods.length == 0) {
        wx.showToast({
          title: '暂无新数据！',
          icon: "none",
        });
        this.setData({
          pageIndex: pageIndex - 1,
          isEnd: true,
        });
        return;
      }
      // 下拉刷新
      if (pageIndex == 1) {
        this.setData({
          list: goods,
          isEnd: false,
        });
        wx.stopPullDownRefresh();
        return;
      }
      // pageIndex >= 2 上拉加载
      let { list } = this.data;
      this.setData({
        list: [...list, ...goods]
      });
      wx.stopPullDownRefresh();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ id }) {
    this.setData({ id });
    this.loadList();
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
    this.setData({
      pageIndex: 1,
    });
    this.loadList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let { isEnd, pageIndex } = this.data;
    //无新数据
    if (isEnd) {
      wx.showToast({
        title: '暂无新数据！',
        icon: "none",
      });
      return;
    }
    this.setData({
      pageIndex: pageIndex + 1
    });
    this.loadList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})