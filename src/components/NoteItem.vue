<template>
  <div @click="onClick" :class="[showNote ? 'bring-to-front' : '', 'note']">
    <div class="note-header">
      <div class="note-header-text">
        <h2 class="note-title">
          <span
            ><i v-show="note.pinned" class="fa-solid fa-thumbtack"></i
            >{{ note.title }}</span
          >
          <span class="last-updated">{{ lastUpdated }}</span>
        </h2>
      </div>
      <div class="btn-group" v-show="showNote">
        <IconButton
          v-for="btn in buttons"
          :key="btn.type"
          :btn="btn"
          @click.stop="$emit(btn.emit, note.id)"
        />
      </div>
      <!-- <CollapsibleButtonGroup :showButtons="showButtons">
      </CollapsibleButtonGroup> -->
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
import CollapsibleButtonGroup from "./CollapsibleButtonGroup.vue";
import dayjs from "dayjs";

export default defineComponent({
  name: "NoteItem",
  components: { IconButton },
  props: ["note", "openNote"],
  emits: [
    "toggle-pin",
    "get-edit-note-form",
    "confirm-delete",
    "set-open-note",
  ],
  data() {
    return {
      showNote: false,
      showButtons: false,
      buttons: {
        pin: {
          text: "pin",
          class: "",
          icon: "fa-thumbtack",
          emit: "toggle-pin",
        },
        edit: {
          text: "edit",
          class: "btn-blue",
          icon: "fa-pencil",
          emit: "get-edit-note-form",
        },
        delete: {
          text: "delete",
          class: "btn-red",
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
    onClick() {
      this.showNote = !this.showNote;
      this.$emit("set-open-note", this.showNote ? this.note.id : 0);
    },
  },
  watch: {
    note(newNote) {
      this.buttons.pin.class = newNote.pinned ? "btn-orange" : "";
    },
    openNote(newOpenNote) {
      if (newOpenNote !== this.note.id) {
        this.showNote = false;
      }
    },
  },
});
</script>

<style scoped lang="scss">
.note {
  background-color: $gray1;
  padding: 15px;
  margin-bottom: 10px;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  &:hover {
    cursor: pointer;
    background-color: $gray2;
  }
}

.note-header {
  @include mq(mobile) {
    @include flexbox(column, center, flex-start);
    gap: 10px;
  }
  @include flexbox(row, space-between);
  margin-bottom: 5px;
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

.note-title {
  font-size: 1em;
}

h2,
p {
  margin: 0;
}

h2 {
  @include flexbox(column, center, flex-start);
  @include mq(tablet) {
    @include flexbox();
  }
}

.fa-thumbtack {
  font-size: 0.7em;
  margin-right: 8px;
}

.last-updated {
  font-weight: 300;
  font-size: 0.65em;

  @include mq(tablet) {
    margin-left: 8px;
  }
}
</style>
