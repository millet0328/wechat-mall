import app from "../../utils/ajax.js";
// 获取所有收藏的商品
let list = (data) => app.get('/collection', data);
// 添加商品至我的收藏
let add = (data) => app.post('/collection', data);
// 取消收藏的商品
let remove = (id, data) => app.delete(`/collection/${id}`, data);

export default {
  list,
  add,
  remove,
}