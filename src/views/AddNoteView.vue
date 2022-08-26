<template>
  <ContentModal @backdrop-click="goBack">
    <NoteForm @add-note="addNote" @edit-note="editNote" />
  </ContentModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NoteForm from "../components/NoteForm.vue";
import ContentModal from "../components/ContentModal.vue";

interface Note {
  title: string;
  text: string;
  id: number;
  lastUpdated: Date;
  pinned: boolean;
}
export default defineComponent({
  name: "AddNoteView",
  components: { NoteForm, ContentModal },
  methods: {
    goBack() {
      this.$router.back();
    },
    addNote(newNote: Note) {
      this.$emit("add-note", newNote);
      this.goBack();
    },
  },
});
</script>
