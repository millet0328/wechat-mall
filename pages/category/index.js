// pages/cartergory/index.js
import { Category } from "../../api/index";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    subCate: [],
    activeIndex: 0,
  },
  async handleChange(event) {
    // 解构参数
    let { i, id } = event.target.dataset;
    let { status, data } = await Category.subCate({ pId: id });
    this.setData({
      activeIndex: i,
      subCate: data,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取一级分类
    let { status, data } = await Category.subCate({ pId: 1 });
    // 获取一级分类的第一项子分类
    let { data: subCate } = await Category.subCate({ pId: data[0].id });
    this.setData({
      category: data,
      subCate
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