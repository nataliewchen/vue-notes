<template>
  <div class="notes-list">
    <NoteItem v-for="note in sortedNotesByPin" :key="note.id" :note="note" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NoteItem from "./NoteItem.vue";
import { Note } from "../types/custom-types.js";

export default defineComponent({
  name: "NotesList",
  components: { NoteItem },
  props: ["notes"],
  computed: {
    sortedNotesByPin() {
      const pinned = this.notes.filter((note: Note) => note.pinned);
      pinned.sort(
        (a: Note, b: Note) => (a.lastUpdated > b.lastUpdated ? -1 : 1) // most recent first
      );
      const unpinned = this.notes.filter((note: Note) => !note.pinned);
      return [...pinned, ...unpinned];
    },
  },
});
</script>

<style scoped lang="scss">
.notes-list {
  margin-top: 50px;

  @include mq(tablet) {
    padding: 0 20px;
  }
}
</style>
