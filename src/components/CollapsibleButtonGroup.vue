<template>
  <div class="collapsible-btn-group">
    <button @click.stop="toggleShowContent" class="btn-dropdown">
      <i
        :class="['fa-solid', showContent ? 'fa-chevron-up' : 'fa-chevron-down']"
      ></i>
    </button>
    <div class="content" v-show="showContent" @click="closeContent">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CollapsibleButtonGroup",
  props: ["showButtons"],
  data() {
    return {
      showContent: false,
    };
  },
  methods: {
    toggleShowContent() {
      this.showContent = !this.showContent;
    },
    closeContent() {
      console.log("click content");
      this.showContent = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.collapsible-btn-group {
  position: relative;
  @include flexbox(column);
}
.content {
  position: absolute;
  transform: translateY(70%);
  z-index: 5;
}

.btn-dropdown {
  background-color: #00000000;
  color: $gray3;
  scale: 1.3;
}

:deep(.btn-group) {
  @include flexbox(column, center, stretch);
  gap: 3px;
}
</style>

