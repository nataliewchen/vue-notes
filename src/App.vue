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
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 30px;
}

#app {
  font-family: "Mulish", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  border: 2px solid $gray5;
  max-width: 600px;
  padding: 20px 10px;

  @include mq(mobile) {
    font-size: 90%;
  }
}

.dark-mode {
  background-color: black;
  #app {
    color: white;
    border-color: white;

    .note-item {
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

    .hover-circle-btn:hover {
      background-color: $gray3;
    }

    .modal {
      background-color: black;
      border-color: white;
    }

    #text,
    #title,
    #query {
      background-color: black;
      color: white;
      border-color: white;
    }

    i {
      color: white;
    }
  }
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
  scale: 1.05;
}

i:hover {
  cursor: pointer;
}

.btn-group {
  @include flexbox();
  gap: 0.8em;
  width: 100%;

  > * {
    flex: 1 1 0px;
    white-space: nowrap;
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

.transparent {
  background-color: #00000000;
}

header,
.search-bar {
  padding: 0 10px;
  margin-bottom: 30px;

  @include mq(tablet) {
    padding: 0 40px;
  }
}

form {
  text-align: center;
  width: 100%;
}
.form-title {
  margin-top: 0;
}
.form-control {
  margin-bottom: 10px;

  textarea,
  input {
    font-family: inherit;
    padding: 8px;
    resize: none;
    font-size: 1em;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid black;
  }
}
</style>
