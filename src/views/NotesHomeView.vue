<template>
  <AppHeader :darkMode="darkMode" @toggle-dark-mode="toggleDarkMode" />
  <SearchBar @query-change="searchNotes" />
  <NotesList :notes="notes" :filteredNotes="filteredNotes" />
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
import SearchBar from "../components/SearchBar.vue";
import { Note } from "../types/custom-types.js";

export default defineComponent({
  name: "NotesHomeView",
  components: { AppHeader, NotesList, SearchBar },
  data() {
    return {
      notes: [] as Note[],
      filteredNotes: [] as Note[],
      darkMode: false,
    };
  },
  methods: {
    addNote(newNote: Note) {
      this.notes = [newNote, ...this.notes]; // most recent first
    },
    deleteNote(id: number) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    editNote(editedNote: Note) {
      this.notes = [
        editedNote,
        ...this.notes.filter((note) => note.id !== editedNote.id), // most recently updated first
      ];
    },
    searchNotes(query: string) {
      if (!query) {
        this.filteredNotes = this.notes; // show all notes
      } else {
        const filtered = this.notes.filter(
          (note: Note) =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.text.toLowerCase().includes(query.toLowerCase())
        );
        this.filteredNotes = filtered;
      }
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    togglePin(id: number) {
      this.notes = this.notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      );
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
    notes(newNotes) {
      localStorage.setItem("notes", JSON.stringify(newNotes));
      this.filteredNotes = newNotes;
    },
  },
  mounted() {
    const localNotes = localStorage.getItem("notes");
    const localDarkMode = localStorage.getItem("darkMode");
    if (localNotes) {
      this.notes = JSON.parse(localNotes);
      this.filteredNotes = JSON.parse(localNotes);
    }
    if (localDarkMode && localDarkMode === "true") {
      this.darkMode = true;
    }
  },
});
</script>

