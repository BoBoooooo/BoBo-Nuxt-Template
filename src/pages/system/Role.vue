<!--
@file 角色权限管理
@author BoBo
@copyright BoBo
@createDate 2018年12月1日22:07:03
-->
<template>
  <div class="page-container">
    <CrudTable
      ref="table"
      table-name="role"
      table-title="角色列表"
      full-height
      order-condition="timestamp desc"
      :visible-list="{
        btnDel: true,
      }"
    />
  </div>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "Role",
})
export default class Role extends Vue {}
</script>
