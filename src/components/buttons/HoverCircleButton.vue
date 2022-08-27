<template>
  <button class="hover-circle-btn">
    <i :class="['fa-solid', icon]" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HoverCircleButton",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.hover-circle-btn {
  @include circle(50px);
  position: relative;
  background-color: #00000000;
  &:hover {
    background-color: $gray1;
    scale: 1;
  }
  i {
    color: black;
    font-size: 1.9em;
    @include absolute-center();
  }
}
</style>