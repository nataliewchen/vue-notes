<template>
  <ContentModal @backdrop-click="confirmClose" :closeOnBackdropClick="false">
    <NoteForm />
  </ContentModal>
  <ContentModal
    v-show="showExitModal"
    @backdrop-click="backToAddForm"
    :small="true"
    :transparent="true"
  >
    <h3>Are you sure you want to discard your note?</h3>
    <div class="btn-group">
      <button @click="backToAddForm">Cancel</button>
      <button @click="discardNote" class="btn-red">Discard</button>
    </div>
  </ContentModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import NoteForm from "../components/NoteForm.vue";
import ContentModal from "../components/ContentModal.vue";

export default defineComponent({
  name: "AddNoteView",
  components: { NoteForm, ContentModal },
  data() {
    return {
      showExitModal: false,
    };
  },
  methods: {
    backToAddForm() {
      this.showExitModal = false;
    },
    confirmClose() {
      if (
        // text in form, ask to discard changes
        (document.querySelector("#title") as HTMLInputElement).value ||
        (document.querySelector("#text") as HTMLTextAreaElement).value
      ) {
        this.showExitModal = true;
      } else {
        // form empty, exit form
        this.discardNote();
      }
    },
    discardNote() {
      this.$router.push("/");
    },
  },
});
</script>
