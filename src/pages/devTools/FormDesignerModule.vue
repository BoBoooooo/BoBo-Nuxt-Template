<!--
@file 动态表单设计器
@author BoBo
@copyright BoBo
@createDate 2018年12月13日21:06:23
-->
<template>
  <div class="page-container">
    <no-ssr>
      <FormDesigner></FormDesigner>
    </no-ssr>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component({
  name: "FormDesignerModule",
})
export default class FormDesignerModule extends Vue {}
</script>
