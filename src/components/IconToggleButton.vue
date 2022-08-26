<template>
  <div @click="toggleSlider" class="toggle-btn">
    <div class="icon">
      <i :class="['fa-solid', icons.false]"></i>
    </div>
    <div class="slider"></div>
    <i :class="['fa-solid', icons.true]"></i>
  </div>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToggleButton",
  props: ["icons", "condition"],
  emits: ["toggle-click"],
  methods: {
    toggleSlider() {
      const slider = document.querySelector(".slider");
      if (slider) {
        slider.classList.toggle("slider-left");
      }

      this.$emit("toggle-click");
    },
  },
  watch: {
    condition() {
      const slider = document.querySelector(".slider");
      if (this.condition) {
        slider.classList.add("slider-left");
      } else {
        slider.classList.remove("slider-left");
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

