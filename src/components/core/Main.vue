<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <nuxt :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: "Main",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.app-main {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
