<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/new">new</router-link>
  </div>

  <router-view
    :notes="notes"
    @add-note="addNote"
    @toggle-pin="togglePin"
    @edit-note="editNote"
    @delete-note="deleteNote"
  />
  <router-view name="AddNoteView" :notes="notes" @add-note="addNote" />
  <ContentModal v-show="showModal">
    <h3>Are you sure you want to delete this note?</h3>
    <div class="btn-group">
      <button @click="closeModal">Cancel</button>
      <button @click="deleteNote" class="btn-red">Delete</button>
    </div>
  </ContentModal>
  <div class="container">
    <AppHeader :darkMode="darkMode" @toggle-dark-mode="toggleDarkMode" />
    <!-- <NoteForm v-show="showForm" @add-note="addNote" :noteToEdit="noteToEdit" /> -->
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
// import NoteForm from "./components/NoteForm.vue";
import NotesList from "./components/NotesList.vue";
import ContentModal from "./components/ContentModal.vue";

interface Note {
  title: string;
  text: string;
  id: number;
  lastUpdated: Date;
  pinned: boolean;
}

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    NotesList,

    ContentModal,
  },
  data() {
    return {
      notes: [] as Note[],
      pinned: [] as Note[],
      showForm: false,
      showModal: false,
      noteIdToDelete: 0,
      darkMode: false,
      detectOutsideClick: false,
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
    getEditNoteForm(id: number) {
      const note = this.notes.find((note) => note.id === id);
      if (note) {
        this.showForm = true;
        window.scroll(0, 0);
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
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

body {
  overflow-y: scroll;
  margin: 0;
}

#app {
  font-family: "Mulish", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $gray5;
  margin: 30px;

  @include mq(mobile) {
    font-size: 80%;
  }
}

.container {
  border: 2px solid $gray5;
  max-width: 700px;
  padding: 20px 10px;
  @include mq(tablet) {
    @include margin-auto();
  }
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
    background-color: $gray5;
    &:hover {
      background-color: $gray4;
    }
  }

  .toggle-btn {
    background-color: white;

    i {
      color: $gray5;
    }
  }

  .slider {
    background-color: $gray5;
  }

  .circle:hover {
    background-color: $gray3;
  }

  .confirm-delete-modal {
    background-color: black;
    border-color: white;
  }
}

.hover {
  cursor: pointer;
}

button {
  border-radius: 5px;
  border: none;
  padding: 8px 10px;
  cursor: pointer;
  color: white;
  font-family: inherit;
  background-color: $gray3;
}

button:hover {
  scale: 1.1;
}

i:hover {
  cursor: pointer;
}

.btn-group {
  @include flexbox();
  gap: 0.5em;
}

.btn-green {
  background-color: $green;
}
.btn-red {
  background-color: $red;
}
.btn-blue {
  background-color: $blue;
}
.btn-orange {
  background-color: $orange;
}

.bring-to-front {
  position: relative;
  z-index: 2;
}
</style>
