<template>
  <div
    class="notes-list pinned-notes"
    v-for="note in sortedNotesByPin"
    :key="note.key"
  >
    <NoteItem
      :note="note"
      @get-edit-note-form="$emit('get-edit-note-form', note.id)"
      @confirm-delete="$emit('confirm-delete', note.id)"
      @toggle-pin="$emit('toggle-pin', note.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NoteItem from "./NoteItem.vue";

interface Note {
  title: string;
  text: string;
  id: number;
  lastUpdated: Date;
  pinned: boolean;
}

export default defineComponent({
  name: "NotesList",
  components: { NoteItem },
  props: ["notes"],
  emits: ["get-edit-note-form", "confirm-delete", "toggle-pin"],
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
</style>
