<template>
  <div class="notes-list">
    <div class="no-notes">
      {{
        filteredNotes.length === 0 && notes.length > 0 ? "no notes found" : ""
      }}
    </div>
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
    filteredNotes: {
      type: Array as PropType<Note[]>,
      required: true,
    },
  },
  computed: {
    pinnedNotes() {
      const pinned = this.filteredNotes.filter((note: Note) => note.pinned);
      pinned.sort(
        (a: Note, b: Note) => (a.lastUpdated > b.lastUpdated ? -1 : 1) // most recent first
      );
      return pinned;
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
