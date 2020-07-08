// pages/search/bar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 搜索
  handleSearch(event) {
    // 提取表单数据
    let formData = event.detail.value;
    // 传入表单数据，调用验证方法
    let isValid = this.WxValidate.checkForm(formData);
    if (!isValid) {
      let { msg } = this.WxValidate.errorList[0];
      wx.showToast({
        title: msg,
        icon: 'none',
      })
      return false
    }
    wx.navigateTo({
      url: `../list/index?keyword=${formData.keyword}`,
    });
  },
  // 初始化表单验证
  initValidate() {
    // 验证字段的规则
    const rules = {
      keyword: {
        required: true,
        minlength: 2,
      },
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      keyword: {
        required: '请输入搜索的关键字！',
      },
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
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