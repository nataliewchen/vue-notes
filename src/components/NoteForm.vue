<template>
  <form @submit.prevent="onSubmit" data-test="form">
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
      ></textarea>
    </div>
    <button class="btn-green">save</button>
  </form>
</template>



<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoteForm",
  components: {},
  props: ["noteToEdit"],
  emits: ["edit-note", "add-note"],
  data() {
    return {
      title: "",
      text: "",
      id: Number,
      lastUpdated: Date,
      pinned: false,
    };
  },
  computed: {
    // isEditing() {
    //   return Object.entries(this.noteToEdit).length > 0;
    // },
  },
  watch: {
    noteToEdit(newNote) {
      this.title = newNote.title;
      this.text = newNote.text;
      this.id = newNote.id;
      this.lastUpdated = newNote.lastUpdated;
      this.pinned = newNote.pinned;
    },
  },
  methods: {
    onSubmit() {
      const newNote = {
        title: this.title,
        text: this.text,
        // id: this.isEditing ? this.id : Date.now(), // keep same id if editing existing note
        id: Date.now(),
        lastUpdated: new Date(),
        pinned: this.pinned,
      };

      this.title = "";
      this.text = "";

      // if (this.isEditing) {
      //   this.$emit("edit-note", newNote);
      // } else {
      this.$emit("add-note", newNote);
      // }
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
</style>