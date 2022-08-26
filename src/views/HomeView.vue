<template>
  <div class="container">
    <AppHeader :darkMode="darkMode" @toggle-dark-mode="toggleDarkMode" />
    <NotesList :notes="notes" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "../components/AppHeader.vue";
import NotesList from "../components/NotesList.vue";

export default defineComponent({
  name: "HomeView",
  props: ["notes"],
  components: { AppHeader, NotesList },
  emits: ["add-note", "toggle-pin", "edit-note", "delete-note"],
});
</script>
