<template>
  <div class="note">
    <div class="content">
      <h2>
        <i v-show="note.pinned" class="fa-solid fa-thumbtack"></i>
        {{ note.title }}
        <span class="last-updated"> | {{ lastUpdated }}</span>
      </h2>
      <p>{{ note.text }}</p>
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
  emits: ["toggle-pin", "get-edit-note-form", "confirm-delete"],
  data() {
    return {
      buttons: [
        {
          type: "pin",
          color: this.note.pinned ? "gray" : "orange",
          icon: "fa-thumbtack",
          emit: "toggle-pin",
        },
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
  padding: 15px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2,
  p {
    margin: 0;
  }

  h2 {
    display: flex;
    align-items: center;
  }

  .fa-thumbtack {
    font-size: 0.7em;
    margin-right: 10px;
  }

  .last-updated {
    font-weight: 300;
    font-size: 0.65em;

    margin: 0 8px;
  }
}
</style>
