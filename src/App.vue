<template>
  <ConfirmDeleteModal
    @close-modal="closeModal"
    @delete-note="deleteNote"
    v-show="showModal"
  />
  <div class="container">
    <AppHeader
      :showForm="showForm"
      @toggle-form="toggleForm"
      :darkMode="darkMode"
      @toggle-dark-mode="toggleDarkMode"
    />
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
import ConfirmDeleteModal from "./components/ConfirmDeleteModal.vue";

interface Note {
  title: string;
  text: string;
  id: number;
  lastUpdated: Date;
  pinned: boolean;
}

export default defineComponent({
  name: "App",
  components: { AppHeader, NotesList, NoteForm, ConfirmDeleteModal },
  data() {
    return {
      notes: [] as Note[],
      noteToEdit: {},
      showForm: false,
      showModal: false,
      noteIdToDelete: 0,
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
        window.scroll(0, 0);
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

.dark-mode {
  background-color: black;
  #app {
    color: white;
  }

  .container {
    border-color: white;
  }

  .note {
    background-color: #303030;
    &:hover {
      background-color: #424242;
    }
  }

  .toggle-btn {
    background-color: white;

    i {
      color: rgb(39, 39, 39);
    }
  }

  .slider {
    background-color: rgb(39, 39, 39);
  }

  .circle:hover {
    background-color: rgb(65, 65, 65);
  }
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
</style>
