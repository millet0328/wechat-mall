import app from "../../utils/ajax.js";

// 添加商品至购物车
let add = (data) => app.post('/cart', data);
// 获取购物车列表
let list = (data) => app.get('/cart/list', data);
// 购物车减少商品数量
let decrease = (data) => app.put('/cart/decrease', data);
// 购物车增加商品数量
let increase = (data) => app.put('/cart/increase', data);
// 购物车删除商品
let remove = (id, data) => app.delete(`/cart/${id}`, data);

export default {
  list,
  add,
  remove,
  decrease,
  increase,
}