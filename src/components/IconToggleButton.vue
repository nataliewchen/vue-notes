<template>
  <div @click="toggleSlider" class="toggle-btn">
    <div class="icon">
      <i :class="['fa-solid', icons.false.icon]"></i>
    </div>
    <div class="slider"></div>
    <i :class="['fa-solid', icons.true.icon]"></i>
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
  background-color: rgb(211, 211, 211);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;

  &:hover {
    cursor: pointer;
  }
}

.slider {
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-color: white;
  position: absolute;
  top: 50%;
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

