<template>
  <div class="notes-list">
    <div class="no-notes">
      {{
        filteredNotes.length === 0 && notes.length > 0 ? "no notes found" : ""
      }}
    </div>
    <!-- <NoteItem v-for="note in filteredNotes" :key="note.id" :note="note" /> -->
    <NoteItem v-for="note in pinnedNotes" :key="note.id" :note="note" />
    <hr v-if="pinnedNotes.length && unpinnedNotes.length" />
    <NoteItem v-for="note in unpinnedNotes" :key="note.id" :note="note" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import NoteItem from "./NoteItem.vue";
import { Note } from "../types/custom-types.js";

export default defineComponent({
  name: "NotesList",
  components: { NoteItem },
  props: {
    notes: {
      type: Array as PropType<Note[]>,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  computed: {
    filteredNotes() {
      if (!this.query) {
        return this.notes;
      } else {
        return this.notes.filter(
          (note: Note) =>
            note.title.toLowerCase().includes(this.query) ||
            note.text.toLowerCase().includes(this.query)
        );
      }
    },
    pinnedNotes() {
      return this.filteredNotes.filter((note: Note) => note.pinned);
    },
    unpinnedNotes() {
      return this.filteredNotes.filter((note: Note) => !note.pinned);
    },
  },
});
</script>

<style scoped lang="scss">
.notes-list {
  margin-top: 30px;

  @include mq(tablet) {
    padding: 0 20px;
  }
}

hr {
  margin: 15px 0;
}

.no-notes {
  text-align: center;
}
</style>
