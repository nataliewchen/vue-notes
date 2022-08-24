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
      <textarea
        rows="5"
        v-model="text"
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
    isEditing() {
      return Object.entries(this.noteToEdit).length > 0;
    },
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
        id: this.isEditing ? this.id : Date.now(), // keep same id if editing existing note
        lastUpdated: new Date(),
        pinned: this.pinned,
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
  margin-bottom: 50px;
}
.form-control {
  margin-bottom: 10px;

  input,
  textarea {
    width: 100%;
    max-width: 400px;
    font-family: inherit;
    padding: 8px;
  }

  textarea {
    resize: none;
    font-size: 1em;
  }
}

#title {
  font-size: 1.2em;
  font-weight: 600;
}
</style>