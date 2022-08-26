<template>
  <ContentModal @backdrop-click="closeModal">
    <div class="btn-group btn-header">
      <div class="btn-group">
        <IconButton
          :btn="buttons.pin"
          @click.stop="$emit('toggle-pin', note.id)"
          :class="note.pinned ? 'btn-orange' : ''"
        />
        <IconButton
          :btn="isEditing ? buttons.save : buttons.edit"
          @click.stop="toggleEditing"
        />
        <IconButton :btn="buttons.delete" @click.stop="confirmDelete" />
      </div>
      <HoverCircleButton icon="fa-xmark" @click="closeModal" />
    </div>
    <NoteForm :noteData="note" :isEditing="isEditing" @handle-form="editNote" />
  </ContentModal>
  <ContentModal v-show="showDeleteModal" @backdrop-click="closeDeleteModal">
    <h3>Are you sure you want to delete this note?</h3>
    <div class="btn-group">
      <button @click="closeDeleteModal">Cancel</button>
      <button @click="deleteNote" class="btn-red">Delete</button>
    </div>
  </ContentModal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
import ContentModal from "../components/ContentModal.vue";
import IconButton from "../components/IconButton.vue";
import NoteForm from "../components/NoteForm.vue";
import HoverCircleButton from "../components/HoverCircleButton.vue";
import { Note } from "../types/custom-types.js";

export default defineComponent({
  name: "NoteDetailView",
  components: { ContentModal, IconButton, NoteForm, HoverCircleButton },
  props: ["notes"],
  emits: ["add-note", "toggle-pin", "edit-note", "delete-note"],

  data() {
    return {
      note: this.notes.find(
        (note: Note) => note.id === Number(this.$route.params.id)
      ),
      isEditing: false,
      showDeleteModal: false,
      buttons: {
        pin: {
          text: "pin",
          class: "",
          icon: "fa-thumbtack",
        },
        edit: {
          text: "edit",
          class: "btn-blue",
          icon: "fa-pencil",
        },
        delete: {
          text: "delete",
          class: "btn-red",
          icon: "fa-trash-can",
        },
        save: {
          text: "save",
          class: "btn-green",
          icon: "fa-check",
        },
      },
    };
  },

  methods: {
    closeModal() {
      this.submitForm();
      this.$router.push("/");
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    editNote(newNote: Note) {
      const pinned = this.note.pinned;
      this.$emit("edit-note", { ...newNote, pinned: this.note.pinned });
      this.$router.push("/");
    },
    submitForm() {
      const submitBtn = document.querySelector(
        ".submit-form"
      ) as HTMLElement | null;
      if (submitBtn) {
        submitBtn.click();
      }
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        this.submitForm();
      }
    },
    confirmDelete() {
      this.showDeleteModal = true;
    },
    deleteNote() {
      this.$emit("delete-note", this.note.id);
      this.$router.push("/");
    },
  },
  watch: {
    editable(newEditable) {
      if (newEditable) {
        const text = document.querySelector(".note-text") as HTMLElement | null;
        if (text) {
          setTimeout(function () {
            text.focus();
          }, 0);
        }
      }
    },
    notes(newNotes) {
      const note = newNotes.find((note: Note) => note.id === this.note.id);
      if (note) {
        this.note = note;
        this.buttons.pin.class = note.pinned ? "btn-orange" : "";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.btn-header {
  @include flexbox(row, space-between, center);
  margin-bottom: 10px;
}
</style>
