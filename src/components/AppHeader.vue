<template>
  <header>
    <h1>notes</h1>

    <!-- how to dynamically bind to btn based on showForm? -->
    <IconButton
      class="btn-toggle"
      v-show="showForm"
      @click="$emit('toggle-form')"
      :btn="closeFormBtn"
    />
    <IconButton
      class="btn-toggle"
      v-show="!showForm"
      @click="$emit('toggle-form')"
      :btn="showFormBtn"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconButton from "./IconButton.vue";

export default defineComponent({
  name: "AppHeader",
  components: { IconButton },
  props: {
    showForm: Boolean,
  },
  data() {
    return {
      showFormBtn: {
        color: "green",
        icon: "fa-plus",
      },
      closeFormBtn: {
        color: "gray",
        icon: "fa-x",
      },
    };
  },
});
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
h1 {
  font-weight: 700;
  font-size: 2.5em;
}
</style>
