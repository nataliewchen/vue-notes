<template>
  <ContentModal @backdrop-click="confirmClose" :closeOnBackdropClick="false">
    <header>
      <div class="btn-header">
        <div class="btn-group">
          <IconButton
            :btn="note.pinned ? buttons.unpin : buttons.pin"
            @click.stop="$emit('toggle-pin', note.id)"
            :class="note.pinned ? 'btn-orange' : ''"
          />
          <IconButton
            :btn="isEditing ? buttons.save : buttons.edit"
            @click.stop="toggleEditing"
          />
          <IconButton :btn="buttons.delete" @click.stop="confirmDelete" />
        </div>
      </div>
      <div class="last-updated">last updated: {{ lastUpdated }}</div>
    </header>
    <NoteForm
      :noteData="note"
      :isEditing="isEditing"
      @handle-form="editNote"
      @toggle-editing="toggleEditing"
      @dblclick="toggleEditing"
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
    v-show="showConfirmCloseModal"
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
import { defineComponent } from "vue";
import dayjs from "dayjs";
import ContentModal from "../components/ContentModal.vue";
import IconButton from "../components/IconButton.vue";
import NoteForm from "../components/NoteForm.vue";
import { Note } from "../types/custom-types.js";

export default defineComponent({
  name: "NoteDetailView",
  components: { ContentModal, IconButton, NoteForm },
  props: ["notes"],
  emits: [
    "add-note",
    "toggle-pin",
    "edit-note",
    "delete-note",
    "toggle-editing",
  ],

  data() {
    return {
      note: this.notes.find(
        (note: Note) => note.id === Number(this.$route.params.id)
      ),
      isEditing: false,
      showDeleteModal: false,
      showConfirmCloseModal: false,
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
  computed: {
    lastUpdated() {
      return dayjs(this.note.lastUpdated).format("M/DD/YY hh:mm a");
    },
  },
  methods: {
    confirmClose() {
      if (this.isEditing) {
        this.showConfirmCloseModal = true;
      } else {
        //if unsaved changes
        const text = document.querySelector("#text") as HTMLInputElement | null;
        const title = document.querySelector(
          "#title"
        ) as HTMLTextAreaElement | null;
        if (
          (text && text.value !== this.note.text) ||
          (title && title.value !== this.note.title)
        ) {
          this.submitForm();
        }
        this.$router.push("/");
      }
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
      // if (!this.isEditing) {
      //   this.submitForm();
      //   this.$router.push(`${this.note.id}`);
      // }
    },
    confirmDelete() {
      this.showDeleteModal = true;
    },
    deleteNote() {
      this.$emit("delete-note", this.note.id);
      this.$router.push("/");
    },
    backToEditing() {
      this.showDeleteModal = false;
      this.showConfirmCloseModal = false;
    },
    discardChanges() {
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
