<template>
  <div class="form-control search-bar">
    <i class="fa-solid fa-search" @click="focusSearch"></i>
    <label for="query" hidden>Search:</label>
    <input type="text" id="query" v-model="query" placeholder="Search" />
    <HoverCircleButton
      data-test="clear-search"
      icon="fa-xmark"
      @click="clearSearch"
    />
  </div>
</template>


<script>
import { defineComponent } from "vue";
import HoverCircleButton from "./buttons/HoverCircleButton.vue";

export default defineComponent({
  name: "SearchBar",
  components: { HoverCircleButton },
  emits: ["query-change"],
  data() {
    return {
      query: "",
    };
  },
  methods: {
    clearSearch() {
      this.query = "";
    },
    focusSearch() {
      document.querySelector("#query").focus();
    },
  },
  watch: {
    query() {
      this.$emit("query-change", this.query);
    },
  },
});
</script>

<style lang="scss" scoped>
.search-bar {
  @include flexbox();
  position: relative;
}

#query {
  padding-left: 35px;
  @include mq(mobile) {
    padding-left: 25px;
  }
}
.hover-circle-btn {
  position: absolute;
  right: 0px;
  scale: 0.6;

  &:hover {
    scale: 0.6;
  }

  @include mq(tablet) {
    right: 40px;
  }
}

.fa-search {
  @include absolute-center();
  left: 60px;

  @include mq(mobile) {
    left: 25px;
  }
}
</style>



