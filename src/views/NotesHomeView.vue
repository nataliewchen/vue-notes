<template>
  <AppHeader :darkMode="darkMode" @toggle-dark-mode="toggleDarkMode" />
  <SearchBar @query-change="setQuery" />
  <NotesList :query="query" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "../components/AppHeader.vue";
import NotesList from "../components/NotesList.vue";
import SearchBar from "../components/SearchBar.vue";

export default defineComponent({
  name: "NotesHomeView",
  components: { AppHeader, NotesList, SearchBar },
  data() {
    return {
      darkMode: false,
      query: "",
    };
  },
  methods: {
    setQuery(query: string) {
      this.query = query.toLowerCase();
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
  watch: {
    darkMode(newDarkMode) {
      localStorage.setItem("darkMode", newDarkMode);
      if (newDarkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    },
  },
  mounted() {
    const localNotes = localStorage.getItem("notes");
    const localDarkMode = localStorage.getItem("darkMode");
    if (localDarkMode && localDarkMode === "true") {
      this.darkMode = true;
    }
  },
});
</script>

