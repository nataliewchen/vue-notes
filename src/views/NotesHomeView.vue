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
  name: "NotesHomeView",
  components: { AppHeader, NotesList },
  data() {
    return {
      notes: [] as Note[],
      darkMode: false,
    };
  },
  methods: {
    addNote(newNote: Note) {
      this.notes = [newNote, ...this.notes];
    },
    editNote(editedNote: Note) {
      this.notes = [
        editedNote,
        ...this.notes.filter((note) => note.id !== editedNote.id),
      ];
    },
    deleteNote(id: number) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    togglePin(id: number) {
      this.notes = this.notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      );
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
  watch: {
    notes(newNotes) {
      localStorage.setItem("notes", JSON.stringify(newNotes));
    },
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
    if (localNotes) {
      this.notes = JSON.parse(localNotes);
    }
    if (localDarkMode && localDarkMode === "true") {
      this.darkMode = true;
    }
  },
});
</script>

