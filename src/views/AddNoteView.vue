<template>
  <ContentModal @backdrop-click="confirmClose" :closeOnBackdropClick="false">
    <NoteForm @handle-form="addNote" />
  </ContentModal>
  <ContentModal
    v-show="showConfirmCloseModal"
    @backdrop-click="closeConfirmCloseModal"
    :small="true"
    :transparent="true"
  >
    <h3>Are you sure you want to discard your note?</h3>
    <div class="btn-group">
      <button @click="backToAdd">Cancel</button>
      <button @click="discardNote" class="btn-red">Discard</button>
    </div>
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
  props: ["notes"],
  emits: ["add-note", "toggle-pin", "edit-note", "delete-note"],
  data() {
    return {
      showConfirmCloseModal: false,
    };
  },
  methods: {
    confirmClose() {
      const text = document.querySelector("#text") as HTMLInputElement | null;
      const title = document.querySelector(
        "#title"
      ) as HTMLTextAreaElement | null;
      if ((text && text.value) || (title && title.value)) {
        this.showConfirmCloseModal = true;
      } else {
        this.$router.push("/");
      }
    },

    addNote(newNote: Note) {
      this.$emit("add-note", newNote);
      this.$router.push("/");
    },
    closeConfirmCloseModal() {
      this.showConfirmCloseModal = false;
    },
    backToAdd() {
      this.showConfirmCloseModal = false;
    },
    discardNote() {
      this.$router.push("/");
    },
  },
});
</script>
