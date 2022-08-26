<template>
  <div class="container">
    <AppHeader
      :darkMode="darkMode"
      @toggle-dark-mode="$emit('toggle-dark-mode')"
    />
    <NotesList :notes="notes" />
  </div>
  <router-view
    :notes="notes"
    @add-note="addNote"
    @toggle-pin="togglePin"
    @edit-note="editNote"
    @delete-note="deleteNote"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "../components/AppHeader.vue";
import NotesList from "../components/NotesList.vue";
import { Note } from "../types/custom-types.js";

export default defineComponent({
  name: "HomeView",
  props: ["notes", "darkMode"],
  components: { AppHeader, NotesList },
  emits: [
    "toggle-dark-mode",
    "add-note",
    "toggle-pin",
    "edit-note",
    "delete-note",
  ],
  methods: {
    addNote(newNote: Note) {
      this.$emit("add-note", newNote);
    },
    togglePin(id: number) {
      this.$emit("toggle-pin", id);
    },
    editNote(editedNote: Note) {
      this.$emit("edit-note", editedNote);
    },
    deleteNote(id: number) {
      this.$emit("delete-note", id);
    },
  },
});
</script>

