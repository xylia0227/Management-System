import mockjs, { mock } from "mockjs";
import homeApi from "./mockServerData/home";
import user from './mockServerData/user';
import permission from "./mockServerData/permission";
// 定义mock的请求拦截
mockjs.mock("/api/home/getData", homeApi.getStatisticalData);

// 用户列表的数据
mockjs.mock("/api/user/add", "post", user.createUser);
mockjs.mock("/api/user/edit", "post", user.updateUser);
mockjs.mock("/api/user/del", "post", user.deleteUser);
mockjs.mock(/api\/user\/getUser/, user.getUserList);
mockjs.mock(/api\/permission\/getMenu/,"post",permission.getMenu)
