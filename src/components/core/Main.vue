<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <no-ssr>
        <nuxt :key="key" />
      </no-ssr>
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
