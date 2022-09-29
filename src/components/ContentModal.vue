<template>
  <div
    :class="[transparent ? 'transparent' : '', 'backdrop']"
    @mousedown="onBackdropClick"
    v-show="showModal"
  >
    <div
      :class="['modal', small ? 'modal-sm' : '']"
      @click.stop=""
      @mousedown.stop=""
    >
      <HoverCircleButton
        class="close-form"
        icon="fa-xmark"
        @click="onBackdropClick"
      />
      <slot></slot>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import HoverCircleButton from "./buttons/HoverCircleButton.vue";

export default defineComponent({
  name: "ContentModal",
  components: { HoverCircleButton },
  emits: ["backdrop-click"],
  props: {
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
    transparent: {
      type: Boolean,
      required: false,
      default: false,
    },
    closeOnBackdropClick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    onBackdropClick() {
      if (this.closeOnBackdropClick) {
        this.showModal = false;
      }
      this.$emit("backdrop-click");
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
  width: 80%;
  max-width: 600px;

  @include mq(tablet) {
    width: 60%;
  }
}

.modal-sm {
  max-width: 300px;
  top: 20%;

  .close-form {
    scale: 0.5;
    top: 0;
    right: 0;
  }
}

.backdrop {
  @include full-screen();
  background-color: #00000080;
  z-index: 99;
}

.close-form {
  position: absolute;
  top: 4px;
  right: 4px;
}
</style>
