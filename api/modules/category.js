import app from '../../utils/ajax';

// 获取子级分类
let subCate = (data) => app.get('/category/sub', data);

export default {
  subCate,
}