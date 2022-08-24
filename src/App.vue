<template>
  <div class="container">
    <AppHeader />
    <NoteForm
      @add-note="addNote"
      @edit-note="editNote"
      :isEditing="isEditing"
      :noteToEdit="noteToEdit"
    />
    <NotesList
      :notes="notes"
      @get-edit-note-form="getEditNoteForm"
      @delete-note="deleteNote"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";
import NoteForm from "./components/NoteForm.vue";
import NotesList from "./components/NotesList.vue";

interface Note {
  title: string;
  text: string;
  id: number;
}

export default defineComponent({
  name: "App",
  components: { AppHeader, NotesList, NoteForm },
  data() {
    return {
      // notes: [] as Note[],
      notes: [
        {
          title: "hello",
          text: "nice to meet u",
          id: 1,
        },
      ],
      noteToEdit: {},
      isEditing: false,
    };
  },
  methods: {
    addNote(newNote: Note) {
      this.notes = [newNote, ...this.notes];
    },
    editNote(editedNote: Note) {
      this.notes = this.notes.map((note) =>
        note.id === editedNote.id ? editedNote : note
      );

      this.noteToEdit = {};
      this.isEditing = false;
    },
    deleteNote(id: number) {
      this.notes = this.notes.filter((note) => note.id !== id);
    },
    getEditNoteForm(id: number) {
      const note = this.notes.find((note) => note.id === id);
      if (note) {
        this.noteToEdit = note;
        this.isEditing = !this.isEditing;
      }
    },
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700&display=swap");
$base: #2c3e50;

body {
  overflow-y: scroll;
}

#app {
  font-family: "Mulish", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  border: 2px solid $base;
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
}

button {
  border-radius: 5px;
  border: none;
  padding: 8px 10px;
  cursor: pointer;
  color: white;
  background-color: darkslategray;
}

.btn-group {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.btn-green {
  background-color: rgb(46, 155, 46);
}
</style>
