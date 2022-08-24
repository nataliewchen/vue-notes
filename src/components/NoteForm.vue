<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="title" hidden>Title:</label>
      <input
        type="text"
        id="title"
        v-model="title"
        placeholder="Title"
        required
      />
    </div>
    <div class="form-control">
      <label for="text" hidden>Text:</label>
      <textarea rows="5" v-model="text" required></textarea>
    </div>
    <button class="btn-green">save</button>
  </form>
</template>



<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoteForm",
  components: {},
  props: ["noteToEdit", "isEditing"],
  emits: ["edit-note", "add-note"],
  data() {
    return {
      title: "",
      text: "",
      id: Number,
    };
  },
  watch: {
    noteToEdit(newNote) {
      this.title = newNote.title;
      this.text = newNote.text;
      this.id = newNote.id;
    },
  },
  methods: {
    onSubmit() {
      const newNote = {
        title: this.title,
        text: this.text,
        id: this.isEditing ? this.id : Date.now(), // keep same id if editing existing note
      };

      this.title = "";
      this.text = "";

      if (this.isEditing) {
        this.$emit("edit-note", newNote);
      } else {
        this.$emit("add-note", newNote);
      }
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

  input,
  textarea {
    width: 100%;
    max-width: 400px;
  }
}

#title {
  font-size: 1.2em;
}
</style>