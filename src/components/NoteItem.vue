<template>
  <div @click="toggleShowNote" class="note">
    <div class="note-header">
      <div class="note-header-text">
        <h2>
          <i v-show="note.pinned" class="fa-solid fa-thumbtack"></i>
          {{ note.title }}
          <span class="last-updated"> | {{ lastUpdated }}</span>
        </h2>
      </div>
      <div class="btn-group">
        <IconButton
          v-for="btn in buttons"
          :key="btn.type"
          :btn="btn"
          @click="$emit(btn.emit, note.id)"
        />
      </div>
    </div>
    <div class="content">
      <p :class="showNote ? 'full-text' : 'preview-text'">
        {{ showNote ? note.text : previewText }}
      </p>
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
      showNote: false,
      buttons: {
        pin: {
          color: this.note.pinned ? "orange" : "gray",
          icon: "fa-thumbtack",
          emit: "toggle-pin",
        },
        edit: {
          color: "rgb(36, 120, 199)",
          icon: "fa-pencil",
          emit: "get-edit-note-form",
        },
        delete: {
          color: "rgb(192, 59, 59)",
          icon: "fa-trash-can",
          emit: "confirm-delete",
        },
      },
    };
  },
  computed: {
    lastUpdated() {
      return dayjs(this.note.lastUpdated).format("M/DD/YY");
    },
    previewText() {
      // only show first line if text contains line break
      const newline = this.note.text.indexOf("\n");
      return newline === -1 ? this.note.text : this.note.text.slice(0, newline);
    },
  },
  methods: {
    toggleShowNote() {
      this.showNote = !this.showNote;
    },
  },
  watch: {
    note(newNote) {
      this.buttons.pin.color = newNote.pinned ? "orange" : "gray";
    },
  },
});
</script>

<style scoped lang="scss">
.note {
  background-color: rgb(231, 231, 231);
  padding: 15px;
  margin: 10px;

  &:hover {
    cursor: pointer;
    background-color: rgb(210, 210, 210);
  }
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.full-text {
  overflow-wrap: break-word;
  white-space: pre-wrap;
}

.preview-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

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
</style>
