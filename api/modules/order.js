import app from '../../utils/ajax';

// 获取确认订单页面的数据
let settle = (data) => app.get('/order/settle', data);

// 提交订单->生成订单
let create = (data) => app.post('/order/create', data, { 'content-type': 'application/json' });

export default {
  settle,
  create,
}