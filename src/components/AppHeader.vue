<template>
  <header>
    <div class="header-top">
      <h1>notes</h1>
      <div class="circle">
        <i
          :class="[showForm ? 'fa-xmark' : 'fa-plus', 'fa-solid']"
          @click="$emit('toggle-form')"
        />
      </div>
    </div>
    <div class="mode-toggle">
      <IconToggleButton
        :icons="toggleIcons"
        :condition="darkMode"
        @toggle-click="$emit('toggle-dark-mode')"
      />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconButton from "./IconButton.vue";
import IconToggleButton from "./IconToggleButton.vue";

export default defineComponent({
  name: "AppHeader",
  components: { IconToggleButton },
  props: {
    showForm: Boolean,
    darkMode: Boolean,
  },
  emits: ["toggle-form", "toggle-dark-mode"],
  data() {
    return {
      showFormBtn: {
        color: "green",
        icon: "fa-plus",
      },
      closeFormBtn: {
        color: "gray",
        icon: "fa-xmark",
      },

      toggleIcons: {
        false: {
          color: "goldenrod",
          icon: "fa-sun",
        },
        true: {
          color: "navy",
          icon: "fa-moon",
        },
      },
    };
  },
});
</script>

<style scoped lang="scss">
header {
  padding: 0 20px;
  margin-bottom: 30px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  font-weight: 700;
  font-size: 2.5em;
  margin: 0;
}
button {
  font-size: 1.3em;
  width: 40px;
  height: 40px;
}

i {
  font-size: 1.9em;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &:hover {
    cursor: pointer;
  }
}

.circle {
  width: 50px;
  height: 50px;
  border-radius: 100px;
  position: relative;
  &:hover {
    background-color: rgb(221, 221, 221);
  }
}
</style>
