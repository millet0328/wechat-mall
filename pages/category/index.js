// pages/cartergory/index.js
import { Category } from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate_1st: [],
    cate_2nd: [],
    activeIndex: 0,
  },
  async handleChange(e) {
    let { i, id } = e.target.dataset;
    this.setData({
      activeIndex: i,
    });
    this.loadCate_2nd(id);
  },
  // 加载二级分类、三级分类
  async loadCate_2nd(id) {
    // 获取二级分类
    let cate_2nd = await this.loadSubcate(id);
    // 获取三级分类
    for (let i = 0; i < cate_2nd.length; i++) {
      const item = cate_2nd[i];
      item.cate_3rd = await this.loadSubcate(item.id);
    }
    this.setData({
      cate_2nd
    });
  },
  // 获取子级分类
  async loadSubcate(id) {
    let { status, data } = await Category.subCate({ pId: id });
    if (status) {
      return data;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let cate_1st = await this.loadSubcate(1);
    this.setData({
      cate_1st
    });
    // 获取一级分类的第一项的子分类
    this.loadCate_2nd(cate_1st[0].id);
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