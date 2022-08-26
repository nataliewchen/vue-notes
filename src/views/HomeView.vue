<template>
  <div class="container">
    <AppHeader
      :darkMode="darkMode"
      @toggle-dark-mode="$emit('toggle-dark-mode')"
    />
    <NotesList :notes="notes" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "../components/AppHeader.vue";
import NotesList from "../components/NotesList.vue";

export default defineComponent({
  name: "HomeView",
  props: ["notes", "darkMode"],
  components: { AppHeader, NotesList },
  emits: ["toggle-dark-mode"],
});
</script>
