/**
 * @file 用户可访问路由权限
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日20:30:41
 */

/**
 * 判断是否有路由权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.name) {
    return roles.some((role) => route.name === role) || route.hidden;
  }
  return true;
}

/**
 * 递归过滤路由表，返回符合用户角色权限的路由表
 * @param routerMap 路由表
 * @param roles 当前登录用户的角色可访问路由
 */
export default function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter((route) => {
    // 如果父级菜单有访问权限
    if (hasPermission(roles, route)) {
      // 下级菜单鉴权
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}
