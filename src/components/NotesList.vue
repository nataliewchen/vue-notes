<template>
  <div class="notes-list" v-for="note in notes" :key="note.key">
    <NoteItem
      :note="note"
      @get-edit-note-form="$emit('get-edit-note-form', note.id)"
      @delete-note="$emit('delete-note', note.id)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NoteItem from "./NoteItem.vue";

export default defineComponent({
  name: "NotesList",
  components: { NoteItem },
  props: ["notes"],
  emits: ["get-edit-note-form", "delete-note"],
});
</script>

<style scoped lang="scss">
</style>
