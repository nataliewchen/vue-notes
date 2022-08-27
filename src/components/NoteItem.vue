<template>
  <div @click="onClick" class="note-item">
    <h2 class="note-title">
      <span
        ><i v-show="note ? note.pinned : ''" class="fa-solid fa-thumbtack"></i
        >{{ note.title }}</span
      >
      <span class="last-updated">{{ lastUpdated }}</span>
    </h2>
    <div class="preview-text">
      {{ previewText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import dayjs from "dayjs";
import { Note } from "../types/custom-types.js";

export default defineComponent({
  name: "NoteItem",
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true,
    },
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
      this.$router.push(`${this.note.id}`);
    },
  },
});
</script>

<style scoped lang="scss">
.note-item {
  background-color: $gray1;
  padding: 15px;
  margin-bottom: 10px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background-color: $gray2;
  }
}

.preview-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.note-title {
  font-size: 1.3em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
  @include flexbox(column, center, flex-start);
}

.fa-thumbtack {
  font-size: 0.7em;
  margin-right: 8px;
}

.last-updated {
  font-weight: 300;
  font-size: 0.6em;
}
</style>
