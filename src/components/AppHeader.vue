<template>
  <header>
    <div class="header-top">
      <h1>notes</h1>
      <HoverCircleButton icon="fa-plus" @click="openForm" />
    </div>
    <IconToggleButton
      :icons="toggleIcons"
      :condition="darkMode"
      @toggle-click="$emit('toggle-dark-mode')"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconToggleButton from "./buttons/IconToggleButton.vue";
import HoverCircleButton from "./buttons/HoverCircleButton.vue";

export default defineComponent({
  name: "AppHeader",
  components: { IconToggleButton, HoverCircleButton },
  emits: ["toggle-dark-mode"],
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      toggleIcons: {
        false: "fa-sun",
        true: "fa-moon",
      },
    };
  },
  methods: {
    openForm() {
      this.$router.push("/new");
    },
  },
});
</script>

<style scoped lang="scss">
.header-top {
  @include flexbox(row, space-between);
}

h1 {
  font-weight: 700;
  font-size: 2.5em;
  margin: 0;
}
</style>
