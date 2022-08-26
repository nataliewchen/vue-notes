<template>
  <router-view
    :notes="notes"
    :darkMode="darkMode"
    @toggle-dark-mode="toggleDarkMode"
    @add-note="addNote"
    @toggle-pin="togglePin"
    @edit-note="editNote"
    @delete-note="deleteNote"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Note } from "./types/custom-types.js";

export default defineComponent({
  name: "App",
  components: {},
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
  max-width: 600px;
  padding: 20px 10px;
  @include mq(tablet) {
    @include margin-auto();
  }
}

.dark-mode {
  background-color: black;
  #app {
    color: white;

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

    .backdrop {
      background-color: $gray4;
    }

    .modal {
      background-color: black;
      border-color: white;
    }

    #text,
    #title {
      background-color: black;
      color: white;
      border-color: white;
    }
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
  gap: 0.8em;
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
