<!--
@file 用户管理
@author BoBo
@copyright BoBo
@createDate 2018年12月1日22:07:03
-->
<template>
  <div class="page-container">
    <el-row :gutter="15" class="full-height">
      <el-col :span="4" class="full-height">
        <div class="full-height" style="overflow: auto">
          <el-input
            v-model="filterText"
            placeholder="请输入查询内容"
            size="mini"
            prefix-icon="el-icon-search"
          >
          </el-input>
          <!-- 部门树 -->
          <el-tree
            ref="deptTree"
            v-loading="loading"
            class="deptTree"
            highlight-current
            accordion
            :data="deptTree.data"
            :filter-node-method="filterNode"
            check-strictly
            :props="deptTree.mapping"
            :node-key="deptTree.mapping.nodeKey"
            :default-expanded-keys="deptTree.expandedKeys"
            @node-click="nodeClick"
          >
            <span slot-scope="{ node }" class="custom-tree-node">
              <div style="float: left">
                <i v-if="node.isLeaf" class="el-icon el-icon-user-solid"></i>
                <i v-else class="el-icon el-icon-s-home"></i>
                <span>{{ node.label }}</span>
              </div>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <client-only
          ><CrudTable
            ref="table"
            table-name="users"
            :table-title="tableTitle"
            order-condition="timestamp desc"
            :remote-funcs="remoteFuncs"
            full-height
            :prefill="tableParams"
            :action-column-width="300"
            :table-params="tableParams"
            :visible-list="{
              tableTitle: true,
              btnDel: true,
            }"
          >
            <template #columnFormatter="{ row, prop }">
              <!-- 头像上传 -->
              <template v-if="prop === 'photo'">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :headers="{ Authorization: getToken }"
                  :data="{
                    userid: userid,
                  }"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="row.photo"
                    :src="row.photo"
                    class="avatar"
                    @click="userid = row.id"
                  />
                  <i
                    v-else
                    class="el-icon el-icon-plus avatar-uploader-icon"
                    @click="userid = row.id"
                  ></i>
                </el-upload>
              </template>
            </template>
            <template #btnCustom="{ row }">
              <el-button
                slot="btnCustom"
                icon="el-icon-edit-outline"
                type="warning"
                size="mini"
                @click="resetPassword(row)"
                >重置密码</el-button
              >
            </template>
          </CrudTable></client-only
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";

import { DML, crud } from "@/api/public/crud";
import { Getter } from "vuex-class";

@Component({
  name: "Users",
})
export default class Users extends Vue {
  @Getter config;

  created() {
    this.loadDeptTree();
  }

  get getToken() {
    return this.$store.getters.token;
  }

  get uploadUrl() {
    return `${window.__HOST__URL__ + window.__PREFIX__URL__}users/uploadImage`;
  }

  imageUrl = "";

  // loading
  loading = false;

  // 搜索text
  tableTitle = "";

  filterText = "";

  userid = "";

  tableParams = {};

  // 部门树
  deptTree = {
    // 部门树数据源
    data: [],
    // 部门树数据源属性映射关系
    mapping: {
      children: "children",
      label: "name",
      nodeKey: "id",
      isLeaf: "leaf",
      disabled: "parentid",
    },
    // 根节点id
    rootId: "-1",
    // 根节点parentid
    rootParentid: 0,
    // 默认展开的节点
    expandedKeys: ["-1"],
  };

  remoteFuncs = {
    // 请求角色
    funcGetRole(resolve) {
      crud(DML.SELECT, "role").then((res) => {
        const options = res.data.list.map((item) => ({
          label: item.roleName,
          value: item.id,
        }));
        resolve(options);
      });
    },
    // 请求部门tree
    funcGetDeptTree: (resolve) => {
      // 此处暂时写死 admin权限的账号可以看到全部部门
      crud(DML.TREE, "dept").then((res) => {
        resolve(res.data);
      });
    },
  };

  handleAvatarSuccess(res, file) {
    this.$refs.table.tableReload();
  }

  beforeAvatarUpload(file) {
    const isJPG = "image/jpeg,image/png".includes(file.type);
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上传图片只能是 JPG/PNG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
  }

  resetPassword(user) {
    const { initialPassword } = this.config;
    this.$confirm(`确认重置到初始密码${initialPassword}`, "提示", {
      confirmButtonText: "重置",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        const data = { ...user };
        data.password = initialPassword;
        crud(DML.UPDATE, "users", data).then((res) => {
          if (res.code === 200) {
            this.$message("重置成功");
            this.$refs.table.tableReload();
          }
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消重置",
        });
      });
  }

  // 请求部门树
  loadDeptTree(data) {
    this.loading = true;
    crud(DML.TREE, "dept").then((res) => {
      this.deptTree.data = [
        {
          name: "全部",
          id: "-1",
          children: res.data,
        },
      ];
      this.loading = false;
      this.deptTree.expandedKeys.push(this.deptTree.rootId);
    });
  }

  dialogOnClose() {
    this.$refs.table.tableReload();
  }

  filterNode(value, data, node) {
    if (!value) return true;
    return data.name.includes(value);
  }

  nodeClick(data, node) {
    if (data.id === this.deptTree.rootId) {
      delete this.tableParams.deptid;
    } else {
      this.tableParams.deptid = data.id;
    }
    this.tableTitle = data.name;
    this.$refs.table.tableReload();
  }

  @Watch("filterText")
  filterTextChange(val) {
    this.$refs.deptTree.filter(val);
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
  ::v-deep.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    display: block;
    width: 39px;
    height: 39px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
  }
}
.avatar-uploader-icon {
  font-size: 22px;
  color: #8c939d;
  width: 39px;
  height: 39px;
  line-height: 39px;
  text-align: center;
}
.avatar {
  width: 39px;
  height: 39px;
  display: block;
}
</style>
