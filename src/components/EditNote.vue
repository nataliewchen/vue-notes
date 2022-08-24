<template>
  <p>edit note</p>
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
  name: "EditNote",
  components: {},
  props: ["noteToEdit"],
  data() {
    return {
      title: this.noteToEdit.title,
      text: this.noteToEdit.text,
      id: this.noteToEdit.id,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.noteToEdit);
      // if (Object.keys(this.noteToEdit).length === 0) {
      //   // creating new note
      //   const newNote = {
      //     title: this.title,
      //     text: this.text,
      //     id: Date.now(),
      //   };
      //   this.$emit("add-note", newNote);
      // } else {
      //   //updating existing note
      //   const updatedNote = {
      //     title: this.title,
      //     text: this.text,
      //     id: this.id,
      //   };
      //   this.$emit("update-note", updatedNote);
      // }
      // this.title = "";
      // this.text = "";
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