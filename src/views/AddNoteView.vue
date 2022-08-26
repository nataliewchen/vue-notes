<template>
  <ContentModal @backdrop-click="goBack">
    <NoteForm @handle-form="addNote" />
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
  emits: ["add-note", "toggle-pin", "edit-note", "delete-note"],
  methods: {
    goBack() {
      this.$router.push("/");
    },
    addNote(newNote: Note) {
      this.$emit("add-note", newNote);
      this.goBack();
    },
  },
});
</script>
