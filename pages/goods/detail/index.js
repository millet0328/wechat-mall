// pages/goods/detail/index.js
import { Goods, Collection } from '../../../api/index.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    num: 1,
    goods: {},
    specs: [{
      id: 1,
      name: "白色",
      price: 65,
    }, {
      id: 2,
      name: "蓝色",
      price: 65,
    }],
    chosedIndex: '',
    isModalShow: false,
    action: '', //操作：加入购物车/立即购买
    isCollected: false, //是否已收藏
  },
  // 收藏商品
  async handleCollect() {
    let { isCollected, id } = this.data;
    if (isCollected) {
      let { status } = await Collection.remove(id);
      if (status) {
        wx.showToast({
          title: '取消收藏成功！',
          icon: "none",
        });
        this.setData({
          isCollected: false
        });
      }
    } else {
      let { status } = await Collection.add({ id });
      if (status) {
        wx.showToast({
          title: '收藏成功！',
          icon: "none",
        });
        this.setData({
          isCollected: true
        });
      }
    }
  },
  // 加入购物车
  handleAddCart() {
    this.closeSpecsModal();
  },
  // 立即购买
  handlePurchase() {
    this.closeSpecsModal();
  },
  // 打开规格Modal
  openSpecsModal(e) {
    this.setData({
      isModalShow: true,
      action: e.target.dataset.action,
    })
  },
  // 关闭规格Modal
  closeSpecsModal() {
    this.setData({
      isModalShow: false,
    })
  },
  // 规格选择
  handleChoseSpecs(e) {
    this.setData({
      chosedIndex: e.target.dataset.index
    })
  },
  // 数量增加
  handleIncrease() {
    let { num } = this.data;
    if (num >= 10) {
      return;
    }
    this.setData({
      num: num + 1
    });
  },
  // 数量减少
  handleDecrease() {
    let { num } = this.data;
    if (num == 1) {
      return;
    }
    this.setData({
      num: num - 1
    });
  },
  // 加载详情
  async loadDetail() {
    let { id } = this.data;
    let { status, data } = await Goods.detail({ id });
    if (status) {
      data.slider = data.slider.split(',');
      this.setData({
        goods: data,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ id }) {
    this.setData({
      id
    })
    this.loadDetail();
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