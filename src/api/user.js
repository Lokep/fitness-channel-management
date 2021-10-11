import request from '@/utils/request'

export const login = data => request({
  url: '/sys/login',
  data,
  method: 'post'
})
export const getInfo = data => request({
  url: '/sys/login',
  data,
  method: 'post'
})
export const logout = data => request({
  url: '/sys/login',
  data,
  method: 'post'
})

// 权限新增或者更新
export const updatePermission = data => request({
  urlL: '/sys/permission/addOrUpdate',
  data,
  method: 'post'
})

export const deletePermission = data => request({
  url: '/sys/permission/del', // 权限删除
  data,
  method: 'post'
})

export const getPermissionDetail = data => request({
  url: '/sys/permission/getPermissionDetail', // 权限详情
  data,
  method: 'post'
})

export const getPermissionOptions = data => request({
  url: '/sys/permission/getPermissions', // 权限列表供Select选择
  data,
  method: 'post'
})

export const getPermissionList = data => request({
  url: '/sys/permission/list', // 权限列表
  data,
  method: 'post'
})

export const updateRole = data => request({
  url: '/sys/role/addOrUpdate', // 角色新增或者更新
  data,
  method: 'post'
})

export const deleteRole = data => request({
  url: '/sys/role/delRole', // 角色删除
  data,
  method: 'post'
})

// 角色详情
export const getRole = data => request({
  url: '/sys/role/getRole',
  data,
  method: 'post'
})

export const getRoleList = data => request({
  url: '/sys/role/getRoleList', // 角色列表
  data,
  method: 'post'
})

export const getRolePermission = data => request({
  url: '/sys/role/rolePermissinon', // 获取角色的权限
  data,
  method: 'post'
})

export const addUser = data => request({
  url: '/sys/user/add', // 账户新增或者更新
  data,
  method: 'post'
})
export const updateUser = data => request({
  url: '/sys/user/updatePwd', // 账户新增或者更新
  data,
  method: 'post'
})

export const deleteUser = data => request({
  url: '/sys/user/del', // 账户删除
  data,
  method: 'post'
})

export const getUser = data => request({
  url: '/sys/user/detail', // 账户详情
  data,
  method: 'post'
})

export const getRoleOptions = data => request({
  url: '/sys/user/getRoles', // 账户的角色列表（供Select选择）
  data,
  method: 'post'
})

export const getUserList = data => request({
  url: '/sys/user/list', // 账户列表
  data,
  method: 'post'
})

export const updatePwd = data => request({
  url: '/sys/user/updatePwd', // 账户更新密码
  data,
  method: 'post'
})

/* 会员信息 */
export const getMemberInfo = data => request({
  url: '/Admin/Member/get', // 账户更新密码
  data,
  method: 'post'
})
