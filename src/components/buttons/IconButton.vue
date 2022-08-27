<template>
  <button :class="[btn.class ? btn.class : '', 'icon-button']">
    <i :class="['fa-solid', btn.icon]"></i>
    <span class="btn-text">&nbsp; {{ btn.text }}</span>
  </button>
</template>


<script>
import { defineComponent } from "vue";
import { FontAwesomeIconButton } from "../../types/custom-types.ts";

export default defineComponent({
  name: "IconButton",
  props: {
    btn: {
      type: FontAwesomeIconButton,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.btn-text {
  @include mq(mobile) {
    display: none;
  }
}
</style>



