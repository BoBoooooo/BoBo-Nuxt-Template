<!--
@file 角色设置表单
@author BoBo
@copyright BoBo
@createDate 2020年9月1日22:08:51
-->
<template>
  <!-- 对话框 -->
  <el-dialog
    v-if="dialog.visible"
    ref="dialog"
    :title="dialogTitle"
    :visible.sync="dialog.visible"
    width="70%"
  >
    <!-- 对话框内动态表单 -->
    <el-row>
      <el-col :span="12">
        <GenerateForm
          ref="generateDialogForm"
          :value="formValues"
          :data="formDesign"
        />
      </el-col>
      <el-col :span="12">
        <el-form size="small" label-position="right" label-width="100px">
          <el-form-item label="菜单">
            <el-tree
              ref="tree"
              class="tree"
              :data="roleTreeData"
              :props="roleTreeMap"
              :node-key="roleTreeMap.nodeKey"
              auto-expand-parent
              show-checkbox
              highlight-current
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row type="flex" justify="end">
      <el-button type="primary" icon="el-icon-check" @click="btnSave_onClick()"
        >保存</el-button
      >
      <el-button icon="el-icon-close" @click="btnCancel_onClick()"
        >取消</el-button
      >
    </el-row>
  </el-dialog>
</template>

<script>
import { DML, crud } from "@/api/public/crud";
import { getFormDetail } from "@/api/system/form";
import { routerOptions as routerMap } from "@/router";

const STATUS = {
  CREATE: 0,
  UPDATE: 1,
};

export default {
  name: "RoleDialog",
  props: {
    // 对话框标题
    textMap: {
      type: Object,
      default: () => ({
        add: "添加",
        edit: "编辑",
      }),
    },
    // 对话框默认宽度
    width: {
      type: String,
      default: "80%",
    },
    // 表名
    tableName: {
      type: String,
      default: "",
    },
    // 表格参数
    tableParams: {
      type: [Object, Array],
      default: () => ({}),
    },
  },
  data() {
    return {
      // 对话框
      dialog: {
        // 对话框状态
        status: null,
        // 对话框参数，用于编辑时暂存id
        params: {},
        // 对话框是否显示
        visible: false,
      },
      // 对话框内文本框们填写的值
      formValues: {},
      // 对话框设计结构json
      formDesign: {},
      // 角色树数据源
      roleTreeData: [],
      // 角色树数据源属性映射关系
      roleTreeMap: {
        children: "children",
        label: "title",
        nodeKey: "name",
      },
      // 所有末端节点
      endNodeKey: [],
      // 选中的首页
      checkedId: null,
    };
  },
  computed: {
    // 对话框标题
    dialogTitle() {
      return this.dialog.status === STATUS.CREATE
        ? this.textMap.add
        : this.textMap.edit;
    },
  },
  created() {
    // 从路由获取菜单树
    this.roleTreeData = routerMap.routes
      .filter((item) => !item.hidden)
      .map((lev1) => {
        lev1.title = lev1.meta.title;
        if (lev1.children) {
          lev1.children = lev1.children.map((lev2) => {
            if (lev2.title == null) {
              lev2.title = lev2.meta.title;
            }
            if (lev2.children) {
              lev2.children = lev2.children.map((lev3) => {
                lev3.title = lev3.meta.title;
                return lev3;
              });
            } else {
              // 末端节点
              this.endNodeKey.push(lev2.name);
            }
            return lev2;
          });
        } else {
          // 末端节点
          this.endNodeKey.push(lev1.name);
        }
        return lev1;
      });
  },
  methods: {
    /**
     * 显示对话框，父元素调用
     *
     * @param {Object} param 对话框保存时的参数
     * @param {Number} status 对话框状态[添加:0,编辑:1]，必须是STATUS枚举
     * @param {Object} formValues 编辑时传入所有字段的默认值
     */
    showDialog(param = {}, status = STATUS.CREATE, formValues = {}) {
      // 保存参数用于save方法
      this.dialog.params = param;
      this.dialog.status = status;
      // 请求对话框内的动态表单json
      getFormDetail(this.tableName).then((res) => {
        this.formDesign = JSON.parse(res.data.formJson);
        this.dialog.visible = true;
        if (this.dialog.status === STATUS.UPDATE) {
          // 填写编辑框
          this.formValues = { ...formValues };
          // 等待页面渲染完毕
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(
              formValues.roleAuthName
                .split(",")
                .filter((name) => this.endNodeKey.includes(name))
            );
          });
        } else {
          this.formValues = {};
        }
      });
    },
    // 保存按钮点击
    btnSave_onClick() {
      // 调用此方法验证表单数据和获取表单数据
      this.$refs.generateDialogForm
        .getData()
        .then((formValue) => {
          console.log(formValue);
          let type;
          let msg;
          // 根据对话框状态判断保存或编辑
          if (this.dialog.status === STATUS.CREATE) {
            type = DML.INSERT;
            msg = "添加成功";
          } else {
            type = DML.UPDATE;
            msg = "编辑成功";
          }
          const opt = {
            ...this.tableParams,
            ...formValue,
            ...this.dialog.params,
          };
          opt.roleAuthName = this.$refs.tree
            .getCheckedKeys()
            .concat(this.$refs.tree.getHalfCheckedKeys())
            .join(",");
          opt.roleAuthNameDict = this.$refs.tree
            .getCheckedNodes()
            .filter((menu) => this.endNodeKey.includes(menu.name))
            .map((menu) => menu.title)
            .join(",");
          crud(type, this.tableName, opt).then(() => {
            this.dialog.visible = false;
            this.$message({
              type: "success",
              message: msg,
            });
            this.$emit("afterSave", {
              status: this.dialog.status,
              dialogParams: this.dialog.params,
            });
          });
        })
        .catch(() => {
          // 数据校验失败
        });
    },

    // 取消按钮点击
    btnCancel_onClick() {
      this.dialog.visible = false;
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.tree {
  border: 1px solid #dcdfe6;
  border-radius: 3px;
}
.el-form-item--small >>> .el-form-item__content {
  max-height: 38vh !important;
  overflow: auto;
}
</style>
