<template>
  <header>
    <div class="header-top">
      <h1>notes</h1>
      <div class="circle hover" @click="openForm">
        <i
          id="toggle-form-btn"
          :class="[showForm ? 'fa-xmark' : 'fa-plus', 'fa-solid']"
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
import IconToggleButton from "./IconToggleButton.vue";

export default defineComponent({
  name: "AppHeader",
  components: { IconToggleButton },
  props: {
    showForm: Boolean,
    darkMode: Boolean,
  },
  emits: ["toggle-dark-mode"],
  data() {
    return {
      showFormBtn: {
        icon: "fa-plus",
      },
      closeFormBtn: {
        icon: "fa-xmark",
      },

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
header {
  padding: 0 10px;
  margin-bottom: 30px;

  @include mq(tablet) {
    padding: 0 40px;
  }
}

.header-top {
  @include flexbox(row, space-between);
}
h1 {
  font-weight: 700;
  font-size: 2.5em;
  margin: 0;
}

i {
  font-size: 1.9em;
  @include absolute-center();
}

.circle {
  @include circle(50px);
  position: relative;
  &:hover {
    background-color: $gray1;
  }
}
</style>
