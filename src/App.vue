<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700&display=swap");

body {
  overflow-y: scroll;
  margin: 0;
}

#app {
  font-family: "Mulish", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $gray5;
  margin: 30px;

  @include mq(mobile) {
    font-size: 80%;
  }
}

.container {
  border: 2px solid $gray5;
  max-width: 600px;
  padding: 20px 10px;
  @include mq(tablet) {
    @include margin-auto();
  }
}

.dark-mode {
  background-color: black;
  #app {
    color: white;

    .container {
      border-color: white;
    }

    .note {
      background-color: $gray5;
      &:hover {
        background-color: $gray4;
      }
    }

    .toggle-btn {
      background-color: white;

      i {
        color: $gray5;
      }
    }

    .slider {
      background-color: $gray5;
    }

    .circle:hover {
      background-color: $gray3;
    }

    .modal {
      background-color: black;
      border-color: white;
    }

    #text,
    #title {
      background-color: black;
      color: white;
      border-color: white;
    }
  }
}

.hover {
  cursor: pointer;
}

button {
  border-radius: 5px;
  border: none;
  padding: 8px 10px;
  cursor: pointer;
  color: white;
  font-family: inherit;
  background-color: $gray3;
}

button:hover {
  scale: 1.1;
}

i:hover {
  cursor: pointer;
}

.btn-group {
  @include flexbox();
  gap: 0.8em;

  > * {
    flex: 1 1 0px;
    white-space: nowrap;
    /* text-align: center; */
  }
}

.btn-green {
  background-color: $green;
}
.btn-red {
  background-color: $red;
}
.btn-blue {
  background-color: $blue;
}
.btn-orange {
  background-color: $orange;
}

.bring-to-front {
  position: relative;
  z-index: 2;
}

.transparent {
  background-color: #00000000;
}

header {
  padding: 0 10px;
  margin-bottom: 30px;

  @include mq(tablet) {
    padding: 0 40px;
  }
}
</style>
