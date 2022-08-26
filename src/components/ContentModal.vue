<template>
  <div
    :class="[transparent ? 'transparent' : '', 'backdrop']"
    @click="onBackdropClick"
    v-show="showModal"
  >
    <div :class="['modal', small ? 'modal-sm' : '']" @click.stop="">
      <slot></slot>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentModal",
  props: {
    small: Boolean,
    transparent: Boolean,
  },
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
  @include absolute-horizontal-center(10%);
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

.modal-sm {
  max-width: 300px;
  top: 20%;
}

.backdrop {
  @include full-screen();
  background-color: #00000080;
  z-index: 99;
}
</style>
