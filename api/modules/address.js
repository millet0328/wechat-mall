import app from "../../utils/ajax.js";
// 收货地址列表
let list = (data) => app.get('/address/list', data);
// 添加地址
let add = (data) => app.post('/address', data);
// 获取地址详情
let detail = (data) => app.get('/address', data);
// 编辑地址
let edit = (data) => app.put('/address', data);
// 删除地址
let remove = (id, data) => app.delete(`/address/${id}`, data);

export default {
  list,
  add,
  detail,
  edit,
  remove,
}