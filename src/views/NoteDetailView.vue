<template>
  <ContentModal @backdrop-click="confirmClose" :closeOnBackdropClick="false">
    <header>
      <div class="btn-header btn-group">
        <IconButton
          :btn="note.pinned ? buttons.unpin : buttons.pin"
          @click.stop="togglePin"
          :class="note.pinned ? 'btn-orange' : ''"
        />
        <IconButton
          :btn="isEditing ? buttons.save : buttons.edit"
          @click.stop="toggleEditing"
        />
        <IconButton :btn="buttons.delete" @click.stop="confirmDelete" />
      </div>
      <div class="last-updated">last updated: {{ lastUpdated }}</div>
    </header>
    <NoteForm
      v-if="note"
      :noteData="note"
      :isEditing="isEditing"
      @focus-input="focusInput"
    />
  </ContentModal>
  <ContentModal
    v-show="showDeleteModal"
    @backdrop-click="backToEditing"
    :small="true"
    :transparent="true"
  >
    <h3>Are you sure you want to delete this note?</h3>
    <div class="btn-group">
      <button @click="backToEditing">Cancel</button>
      <button @click="deleteNote" class="btn-red">Delete</button>
    </div>
  </ContentModal>
  <ContentModal
    v-show="showExitModal"
    @backdrop-click="backToEditing"
    :small="true"
    :transparent="true"
  >
    <h3>Are you sure you want to discard your changes?</h3>
    <div class="btn-group">
      <button @click="backToEditing">Cancel</button>
      <button @click="discardChanges" class="btn-red">Discard</button>
    </div>
  </ContentModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import dayjs from "dayjs";
import ContentModal from "../components/ContentModal.vue";
import IconButton from "../components/buttons/IconButton.vue";
import NoteForm from "../components/NoteForm.vue";
import { Note } from "../types/custom-types.js";
import { notes } from "../notes";

export default defineComponent({
  name: "NoteDetailView",
  components: { ContentModal, IconButton, NoteForm },
  emits: ["add-note", "toggle-pin", "edit-note", "delete-note"],
  data() {
    return {
      notes,
      note: {
        title: "",
        text: "",
        id: 0,
        lastUpdated: new Date(),
        pinned: false,
      },
      isEditing: false,
      showDeleteModal: false,
      showExitModal: false,
      buttons: {
        pin: {
          text: "pin",
          class: "",
          icon: "fa-thumbtack",
        },
        unpin: {
          text: "unpin",
          class: "btn-orange",
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
  created() {
    if (!notes.list.length) {
      notes.getLocalStorageNotes();
    }
    const note = notes.list.find(
      (note: Note) => note.id === Number(this.$route.params.id)
    );
    if (note) {
      this.note = note;
    }
  },
  computed: {
    lastUpdated() {
      return dayjs(this.note?.lastUpdated).format("M/DD/YY hh:mm a");
    },
  },
  methods: {
    backToEditing() {
      this.showDeleteModal = false;
      this.showExitModal = false;
    },
    confirmClose() {
      if (this.isEditing) {
        this.showExitModal = true; // ask user if they want to exit without saving
      } else {
        this.$router.push("/");
      }
    },
    confirmDelete() {
      this.showDeleteModal = true;
    },
    deleteNote() {
      notes.deleteNote(this.note.id);
      this.$router.push("/");
    },
    discardChanges() {
      this.$router.push("/");
    },
    focusInput(e: Event) {
      (e.target as HTMLElement).focus();
      this.isEditing = true;
    },
    submitForm() {
      if (
        // title and/or text actually changed
        (document.querySelector("#title") as HTMLInputElement).value !==
          this.note?.title ||
        (document.querySelector("#text") as HTMLTextAreaElement).value !==
          this.note?.text
      ) {
        (document.querySelector(".submit-form") as HTMLElement).click();
      }
    },
    toggleEditing() {
      if (this.isEditing) {
        // save changes
        this.submitForm();
      }
      this.isEditing = !this.isEditing;
    },
    togglePin() {
      notes.togglePin(this.note.id);
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
  },
});
</script>

<style lang="scss" scoped>
.btn-header {
  @include flexbox(row, space-between, center);
  margin: 30px 0 10px;
}

header {
  padding: 0;
}
</style>
