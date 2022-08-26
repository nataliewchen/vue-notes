<template>
  <div class="circle hover hover-circle-btn">
    <i :class="['fa-solid', icon]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconToggleButton from "./IconToggleButton.vue";

export default defineComponent({
  name: "HoverCircleButton",
  props: {
    icon: String,
  },
});
</script>

<style scoped lang="scss">
i {
  font-size: 1.9em;
  @include absolute-center();
}

.circle {
  @include circle(50px);
  position: relative;
  &:hover {
    background-color: $gray1;
  }
}
</style>