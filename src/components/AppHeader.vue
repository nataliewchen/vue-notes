<template>
  <header>
    <h1>notes</h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
  components: {},
});
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-evenly;
}
h1 {
  font-weight: 700;
}
</style>
