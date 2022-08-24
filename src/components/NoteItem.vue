<template>
  <div class="note">
    <div class="content">
      <h3>{{ note.title }}</h3>
      <p>{{ note.text }}</p>
      <p>{{ lastUpdated }}</p>
    </div>
    <div class="btn-group">
      <IconButton
        v-for="btn of buttons"
        :key="btn.type"
        :btn="btn"
        @click="$emit(btn.emit, note.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconButton from "./IconButton.vue";
import dayjs from "dayjs";

export default defineComponent({
  name: "NoteItem",
  components: { IconButton },
  props: ["note"],
  emits: ["get-edit-note-form", "confirm-delete"],
  data() {
    return {
      buttons: [
        // {
        //   type: "pin",
        //   color: "orange",
        //   icon: "fa-thumbtack",
        //   emit: "pin-note",
        // },
        {
          type: "edit",
          color: "rgb(36, 120, 199)",
          icon: "fa-pencil",
          emit: "get-edit-note-form",
        },
        {
          type: "delete",
          color: "rgb(192, 59, 59)",
          icon: "fa-trash-can",
          emit: "confirm-delete",
        },
      ],
    };
  },
  computed: {
    lastUpdated() {
      return dayjs(this.note.lastUpdated).format("MM/DD/YYYY, h:mma");
    },
  },
});
</script>

<style scoped lang="scss">
.note {
  background-color: rgb(231, 231, 231);
  padding: 10px;
  margin: 5px 10px;
  display: flex;
  justify-content: space-between;

  h3,
  p {
    margin: 0;
  }
}
</style>
