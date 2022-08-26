<template>
  <div class="backdrop" @click="$emit('close-modal')">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentModal",
});
</script>


<style lang="scss" scoped>
.modal {
  border: 2px solid black;
  background-color: white;
  @include absolute-horizontal-center(25%);
  z-index: 100;
  padding: 30px 20px;
  max-width: 400px;

  text-align: center;
  margin-top: 0;
}

.backdrop {
  @include full-screen();
  background-color: #00000080;
  z-index: 99;
}
</style>
