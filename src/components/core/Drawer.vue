<template>
  <div :class="{ 'has-logo': showLogo }">
    <coreLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeRoute"
        :collapse="isCollapse"
        background-color="#305635"
        text-color="#bfcbd9"
        :unique-opened="false"
        active-text-color="rgb(97, 209, 74)"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <coreSidebarItem
          v-for="route in routes"
          :key="route.key"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import variables from "@/assets/styles/variables.scss";
export default {
  data() {
    return {
      variables,
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    activeRoute() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
  },
  mounted() {
    console.log(this.variables);
  },
  methods: {},
};
</script>
