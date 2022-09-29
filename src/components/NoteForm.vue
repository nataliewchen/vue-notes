<template>
  <form
    @submit.prevent="onSubmit"
    :class="existingNote && !isEditing ? 'read-only' : ''"
  >
    <h2 class="form-title" v-if="!existingNote">new note</h2>
    <div class="form-control" @dblclick="focus">
      <label for="title" hidden>Title:</label>
      <input
        type="text"
        v-model="title"
        id="title"
        :placeholder="
          existingNote ? (noteData.title ? noteData.title : '') : 'Title'
        "
        name="title"
        :readonly="existingNote && !isEditing"
      />
    </div>
    <div class="form-control" @dblclick="focus">
      <label for="text" hidden>Text:</label>
      <textarea
        rows="10"
        v-model="text"
        id="text"
        placeholder="Type your note here..."
        required
        :readonly="existingNote && !isEditing"
      ></textarea>
    </div>
    <button v-show="!existingNote" class="btn-green submit-form">save</button>
  </form>
</template>



<script lang="ts">
import { defineComponent, PropType } from "vue";
import { notes } from "../notes";
import { Note } from "../types/custom-types.js";

export default defineComponent({
  name: "NoteForm",
  props: {
    noteData: Object as PropType<Note>,
    isEditing: Boolean,
  },
  emits: ["handle-form", "focus-input"],
  data() {
    return {
      title: this.noteData ? this.noteData.title : "",
      text: this.noteData ? this.noteData.text : "",
      id: this.noteData ? this.noteData.id : Number,
      lastUpdated: this.noteData ? this.noteData.lastUpdated : Date,
      pinned: this.noteData ? this.noteData.pinned : false,
    };
  },
  methods: {
    onSubmit() {
      const newNote: Note = {
        title: this.title,
        text: this.text,
        id: this.existingNote ? Number(this.id) : Date.now(), // keep same id if editing existing note
        lastUpdated: new Date(),
        pinned: this.pinned,
      };

      if (!this.existingNote) {
        notes.addNote(newNote); //add new note
      } else {
        notes.editNote(newNote); // edit existing note
      }

      this.$router.push(`${newNote.id}`);
    },
    focus(e: Event) {
      this.$emit("focus-input", e);
    },
  },
  computed: {
    existingNote() {
      return Boolean(this.noteData);
    },
  },
});
</script>

<style lang="scss" scoped>
#title {
  font-size: 1.2em;
  font-weight: 600;
}

.read-only input,
.read-only textarea {
  border-color: #00000000;

  &:focus {
    outline: none;
  }
}
</style>