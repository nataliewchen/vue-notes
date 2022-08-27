<template>
  <div class="form-control search-bar">
    <i class="fa-solid fa-search" @click="focusSearch"></i>
    <label for="query" hidden>Search:</label>
    <input type="text" id="query" v-model="query" placeholder="Search" />
    <HoverCircleButton
      data-test="clear-search"
      class="clear-search"
      icon="fa-xmark"
      @click="clearSearch"
    />
  </div>
</template>


<script>
import { defineComponent } from "vue";
import HoverCircleButton from "./HoverCircleButton.vue";

console.log(document.querySelector("button"));

export default defineComponent({
  name: "SearchBar",
  components: { HoverCircleButton },
  data() {
    return {
      query: "",
    };
  },
  methods: {
    focusSearch() {
      const search = document.querySelector("#query");
      if (search) {
        search.focus();
      }
    },
    clearSearch() {
      this.query = "";
    },
  },
  watch: {
    query() {
      this.$emit("search-notes", this.query);
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
}
.clear-search {
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
    display: none;
  }
}
</style>



