<template>
  <form
    @submit.prevent="onSubmit"
    data-test="form"
    ref="form"
    :class="isViewing && !isEditing ? 'read-only' : ''"
  >
    <h2 class="form-title" v-if="!isViewing">new note</h2>
    <div class="form-control">
      <label for="title" hidden>Title:</label>
      <input
        type="text"
        v-model="title"
        id="title"
        class="title"
        placeholder="Title"
        name="title"
        data-test="titleInput"
        :readonly="isViewing && !isEditing"
      />
    </div>
    <div class="form-control">
      <label for="text" hidden>Text:</label>
      <textarea
        rows="8"
        v-model="text"
        id="text"
        placeholder="Type your note here..."
        required
        :readonly="isViewing && !isEditing"
      ></textarea>
    </div>
    <button v-show="!isViewing" class="btn-green submit-form">save</button>
  </form>
</template>



<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoteForm",
  components: {},
  props: ["noteData", "isEditing"],
  emits: ["handle-form"],
  data() {
    return {
      title: this.noteData.title ? this.noteData.title : "",
      text: this.noteData.text ? this.noteData.text : "",
      id: this.noteData.id ? this.noteData.id : Number,
      lastUpdated: this.noteData.lastUpdated ? this.noteData.lastUpdated : Date,
      pinned: this.noteData.pinned,
    };
  },
  computed: {
    isViewing() {
      return Boolean(this.noteData);
    },
  },
  // mounted() {
  //   if (this.noteData) {
  //     this.title = this.noteData.title;
  //     this.text = this.noteData.text;
  //     this.id = this.noteData.id;
  //     this.lastUpdated = this.noteData.lastUpdated;
  //     this.pinned = this.noteData.pinned;
  //   }
  // },
  watch: {
    isEditing(newIsEditing) {
      if (newIsEditing) {
        const textarea = document.querySelector("#text") as HTMLElement | null;
        if (textarea) {
          textarea.focus();
        }
      }
    },
  },
  methods: {
    onSubmit() {
      const newNote = {
        title: this.title,
        text: this.text,
        id: this.isViewing ? this.id : Date.now(), // keep same id if editing existing note
        lastUpdated: new Date(),
        pinned: this.pinned,
      };

      console.log("new note", newNote);

      this.title = "";
      this.text = "";
      this.$emit("handle-form", newNote);
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  text-align: center;
}
.form-control {
  margin-bottom: 10px;

  textarea,
  input {
    max-width: 550px;
    font-family: inherit;
    padding: 8px;
    resize: none;
    font-size: 1em;
    width: 100%;
    box-sizing: border-box;
  }
}

#title {
  font-size: 1.2em;
  font-weight: 600;
}

.read-only input:focus,
.read-only textarea:focus {
  outline: none;
}
</style>