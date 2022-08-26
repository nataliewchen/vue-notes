<template>
  <button @click="click" :class="[btn.class, 'icon-button']">
    <i :class="['fa-solid', btn.icon]"></i>
    <span class="btn-text">&nbsp; {{ btn.text }}</span>
  </button>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconButton",
  props: ["btn"],
});
</script>

<style lang="scss" scoped>
.btn-text {
  @include mq(mobile) {
    display: none;
  }
}
</style>



