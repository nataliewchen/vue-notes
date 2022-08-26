<template>
  <div
    :style="{ zIndex: zIndex }"
    class="outside-click"
    @click="$emit('outside-click')"
  ></div>
  <slot></slot>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DetectOutsideClick",
  props: ["detect"],
  emits: ["outside-click"],
  data() {
    return {
      zIndex: -1,
    };
  },
  watch: {
    detect(newDetect) {
      // if detect is true, bring the detection screen to front
      this.zIndex = newDetect ? 1 : -1;
    },
  },
});
</script>


<style lang="scss" scoped>
.outside-click {
  @include full-screen();
  background-color: #00000000;
}
</style>
