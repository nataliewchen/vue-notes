<template>
  <div @click="toggleSlider" class="toggle-btn">
    <i :class="['fa-solid', icons.false]"></i>
    <div class="slider"></div>
    <i :class="['fa-solid', icons.true]"></i>
  </div>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToggleButton",
  props: {
    icons: {
      type: Object,
      required: true,
    },
    condition: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggle-click"],
  methods: {
    toggleSlider() {
      document.querySelector(".slider").classList.toggle("slider-left");
      this.$emit("toggle-click");
    },
  },
  watch: {
    condition() {
      // watch for load from localstorage
      if (this.condition) {
        document.querySelector(".slider").classList.add("slider-left");
      } else {
        document.querySelector(".slider").classList.remove("slider-left");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.toggle-btn {
  width: 60px;
  height: 30px;
  border-radius: 100px;
  background-color: $gray2;
  position: relative;
  @include flexbox(row, space-evenly, center);

  &:hover {
    cursor: pointer;
  }
}

.slider {
  @include circle(20px);
  background-color: white;
  @include absolute-vertical-center();
  right: 8px;

  transform: translateY(-50%);
}

.slider-left {
  left: 8px;
}

i {
  color: white;
}
</style>

