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
        :placeholder="isViewing ? '' : 'Title'"
        name="title"
        data-test="titleInput"
        :readonly="isViewing && !isEditing"
      />
    </div>
    <div class="form-control">
      <label for="text" hidden>Text:</label>
      <textarea
        rows="10"
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
      title: this.noteData ? this.noteData.title : "",
      text: this.noteData ? this.noteData.text : "",
      id: this.noteData ? this.noteData.id : Number,
      lastUpdated: this.noteData ? this.noteData.lastUpdated : Date,
      pinned: this.noteData ? this.noteData.pinned : false,
    };
  },
  computed: {
    isViewing() {
      return Boolean(this.noteData);
    },
  },
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
  width: 100%;
}
.form-control {
  margin-bottom: 10px;

  textarea,
  input {
    font-family: inherit;
    padding: 8px;
    resize: none;
    font-size: 1em;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid black;
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