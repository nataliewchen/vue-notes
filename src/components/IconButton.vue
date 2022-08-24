<template>
  <button :style="{ backgroundColor: btn.color }">
    <i :class="['fa-solid', btn.icon]"></i>
  </button>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconButton",
  props: ["btn"],
});
</script>

