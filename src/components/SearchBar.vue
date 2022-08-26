<template>
  <div class="form-control search-bar">
    <i class="fa-solid fa-search" @click="focusSearch"></i>
    <label for="query" hidden>Search:</label>
    <input type="text" id="query" v-model="query" placeholder="Search" />
    <HoverCircleButton
      class="clear-search"
      icon="fa-xmark"
      @click="clearSearch"
    />
  </div>
</template>


<script>
import { defineComponent } from "vue";
import HoverCircleButton from "./HoverCircleButton.vue";

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

.clear-search {
  position: absolute;
  right: 0px;
  scale: 0.6;

  @include mq(tablet) {
    right: 40px;
  }
}

.fa-search {
  @include mq(mobile) {
    display: none;
  }
  margin-right: 8px;
}
</style>



