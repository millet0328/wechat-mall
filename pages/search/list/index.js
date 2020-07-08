// pages/search/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    currentIndex: 1, //当前第几页
    sort: "",
    isEnd: false,//是否无新数据
  },
  // 获取商品列表
  async loadList() {
    // 当前第几页
    let i = this.data.currentIndex;
    let { status, goods } = await Goods.list({ pageIndex: i, pageSize: 5 });
    if (status) {
      // 暂无新数据
      if (goods.length == 0) {
        wx.showToast({
          title: '暂无新数据！',
          icon: "none",
        });
        this.setData({
          currentIndex: i - 1,
          isEnd: true,
        });
        return;
      }
      // 下拉刷新
      if (i == 1) {
        this.setData({
          list: goods
        });
        wx.stopPullDownRefresh();
        return;
      }
      // i >= 2 上拉加载
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
  onLoad: function (options) {
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
    this.loadList(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //无新数据
    if (this.data.isEnd) {
      wx.showToast({
        title: '暂无新数据！',
        icon: "none",
      });
      return;
    }
    this.setData({
      currentIndex: ++this.data.currentIndex
    });
    this.loadList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})