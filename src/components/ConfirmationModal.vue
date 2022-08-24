<template>
  <div class="backdrop">
    <div class="modal">
      <h3>Are you sure you want to delete this note?</h3>
      <div class="btn-group">
        <button @click="$emit('close-modal')" class="btn-cancel">Cancel</button>
        <button @click="$emit('delete-note')" class="btn-delete">Delete</button>
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
.modal {
  position: absolute;
  width: 50%;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  border: 3px solid black;
  background-color: white;
  z-index: 100;
  padding: 20px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    text-align: center;
  }
}

.backdrop {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
}

.btn-delete {
  background-color: red;
}
</style>
