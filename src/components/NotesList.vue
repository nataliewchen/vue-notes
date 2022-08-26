<template>
  <div class="notes-list">
    <!-- <DetectOutsideClick
      :detect="Boolean(openNote)"
      @outside-click="onOutsideNoteClick"
    > -->
    <NoteItem
      v-for="note in sortedNotesByPin"
      :key="note.id"
      :note="note"
      :openNote="openNote"
      @get-edit-note-form="$emit('get-edit-note-form', note.id)"
      @confirm-delete="$emit('confirm-delete', note.id)"
      @toggle-pin="$emit('toggle-pin', note.id)"
      @set-open-note="setOpenNote"
    />
    <!-- </DetectOutsideClick> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NoteItem from "./NoteItem.vue";
import DetectOutsideClick from "./DetectOutsideClick.vue";

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
  emits: [
    "get-edit-note-form",
    "confirm-delete",
    "toggle-pin",
    "set-open-note",
  ],
  data() {
    return {
      openNote: 0,
      openButtonGroup: 0,
    };
  },
  methods: {
    setOpenNote(id: number) {
      this.openNote = id;
    },
    onOutsideNoteClick() {
      this.openNote = 0;
    },
  },
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
