<template>
  <div class="backdrop" @click="onBackdropClick" v-show="showModal">
    <div class="modal" @click.stop="">
      <slot></slot>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentModal",
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    onBackdropClick() {
      this.showModal = false;
      this.$emit("backdrop-click");
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
});
</script>


<style lang="scss" scoped>
.modal {
  border: 2px solid black;
  background-color: white;
  @include absolute-horizontal-center(30px);
  z-index: 100;
  padding: 30px 20px;
  text-align: center;
  margin-top: 0;
  width: 80%;
  max-width: 600px;

  @include mq(tablet) {
    width: 60%;
  }
}

.backdrop {
  @include full-screen();
  background-color: #00000080;
  z-index: 99;
}
</style>
