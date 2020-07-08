// pages/user/address/edit/index.js
import { Address } from '../../../../api/index';
import WxValidate from '../../../../utils/WxValidate';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      id: '',
    },
    region: ['广东省', '广州市', '海珠区'],
  },
  // 获取详情
  async loadDetail(id) {
    let { status, data } = await Address.detail({ id });
    let { province, city, county } = data;
    if (status) {
      this.setData({
        form: data,
        region: [province, city, county]
      })
    }
  },
  // 省市区
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 调用验证方法，传入参数 e 是 form 表单组件中的数据
  async submitForm(e) {
    const params = e.detail.value;
    let { region } = params;
    params.province = region[0];
    params.city = region[1];
    params.county = region[2];
    // 传入表单数据，调用验证方法
    let isValid = this.WxValidate.checkForm(params);
    if (!isValid) {
      let { msg } = this.WxValidate.errorList[0];
      wx.showToast({
        title: msg,
        icon: 'none',
      })
      return false
    }
    // 发送ajax
    let { status, msg } = await Address.edit(params);
    if (status) {
      wx.showToast({
        title: msg,
        icon: 'none',
        success() {
          setTimeout(function () {
            wx.navigateBack()
          }, 500)
        }
      });
    }
  },
  // 初始化表单验证
  initValidate() {
    // 验证字段的规则
    const rules = {
      name: {
        required: true,
        minlength: 2,
      },
      tel: {
        required: true,
        tel: true,
      },
      province: {
        required: true,
      },
      city: {
        required: true,
      },
      county: {
        required: true,
      },
      street: {
        required: true,
      },
      code: {
        required: true,
        number: true
      },
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: '请输入收货人姓名',
      },
      tel: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
      },
      street: {
        required: '请输入详细地址',
      },
      code: {
        required: '请输入邮政编码',
        number: '请输入6位数字编码'
      }
    }
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ id }) {
    this.loadDetail(id);
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