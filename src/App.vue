<template>
  <ConfirmationModal
    @close-modal="closeModal"
    @delete-note="deleteNote"
    v-show="showModal"
  />
  <div class="container">
    <AppHeader :showForm="showForm" @toggle-form="toggleForm" />
    <NoteForm
      v-show="showForm"
      @add-note="addNote"
      @edit-note="editNote"
      :noteToEdit="noteToEdit"
    />
    <NotesList
      :notes="notes"
      @get-edit-note-form="getEditNoteForm"
      @confirm-delete="confirmDelete"
      @toggle-pin="togglePin"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue";
import NoteForm from "./components/NoteForm.vue";
import NotesList from "./components/NotesList.vue";
import ConfirmationModal from "./components/ConfirmationModal.vue";

interface Note {
  title: string;
  text: string;
  id: number;
  lastUpdated: Date;
  pinned: boolean;
}

export default defineComponent({
  name: "App",
  components: { AppHeader, NotesList, NoteForm, ConfirmationModal },
  data() {
    return {
      // notes: [] as Note[],
      notes: [
        {
          title: "hello",
          text: "nice to meet u",
          id: 1,
          lastUpdated: new Date("December 17, 1995 03:24:00"),
          pinned: false,
        },
        {
          title: "psych",
          text: "i've heard it both ways",
          id: 13,
          lastUpdated: new Date(),
          pinned: false,
        },
      ],
      pinned: [] as Note[],
      noteToEdit: {},
      showForm: false,
      showModal: false,
      noteIdToDelete: 0,
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
    },
    deleteNote() {
      this.notes = this.notes.filter((note) => note.id !== this.noteIdToDelete);
      this.noteIdToDelete = 0;
      this.closeModal();
    },
    getEditNoteForm(id: number) {
      const note = this.notes.find((note) => note.id === id);
      if (note) {
        this.noteToEdit = note;
        this.showForm = true;
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
      this.noteToEdit = {};
    },
    confirmDelete(id: number) {
      this.noteIdToDelete = id;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    togglePin(id: number) {
      this.notes = this.notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      );
    },
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700&display=swap");
$base: #2c3e50;

body {
  overflow-y: scroll;
  margin: 0;
}

#app {
  font-family: "Mulish", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  border: 2px solid $base;
  margin: 50px auto;
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
  font-family: inherit;
}

button:hover {
  scale: 1.05;
}

.btn-group {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.btn-green {
  background-color: rgb(46, 155, 46);
}

.btn-cancel {
  background-color: gray;
}

.btn-toggle {
  width: 40px;
  height: 40px;
}
</style>
