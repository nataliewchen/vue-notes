<template>
  <div class="backdrop" @click="$emit('close-modal')">
    <div class="confirm-delete-modal">
      <h3>Are you sure you want to delete this note?</h3>
      <div class="btn-group">
        <button @click="$emit('close-modal')">Cancel</button>
        <button @click="$emit('delete-note')" class="btn-red">Delete</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmationModal",
});
</script>


<style lang="scss" scoped>
.confirm-delete-modal {
  border: 2px solid black;
  background-color: white;
  @include absolute-horizontal-center(25%);
  z-index: 100;
  padding: 30px 20px;
  max-width: 400px;

  h3 {
    text-align: center;
    margin-top: 0;
  }
}

.backdrop {
  @include full-screen();
  background-color: #00000080;
  z-index: 99;
}
</style>
