<template>
  <div id="app">
    <div class="app-container">
      <Logo></Logo>
      <nuxt-link to="/about">跳转到about页面</nuxt-link>
    </div>
    <!-- <FormDesigner></FormDesigner> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  components: {
    Logo: () => import("@/components/Logo.vue"),
  },
})
export default class Index extends Vue {
  // 生命周期
  created() {
    console.log("created");
  }

  mounted() {
    console.log("mounted");
  }

  async asyncData({ $axios }) {
    return await $axios
      .get("http://server.boboooooo.top:7788/api2/")
      .then((res) => {
        console.log(res);
        return { info: res.data };
      });
  }
}
</script>
<style lang="scss" scoped></style>
