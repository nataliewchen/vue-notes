<template>
  <button @click="$emit('btn-click')" :style="{ backgroundColor: btn.color }">
    <i :class="['fa-solid', btn.icon]"></i>
  </button>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ["btn"],
});
</script>

