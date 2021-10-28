import { component } from "vue/types/umd";

export default[{
  path: '/home',
  name:'首页',
  component:()=>import("../views/"),
}]