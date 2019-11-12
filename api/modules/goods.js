import app from "../../utils/ajax.js";

// 获取商品列表
let list = (data) => app.get('/goods/list', data);
let detail = (data) => app.get('/goods/detail', data);
export default {
  list,
  detail
}