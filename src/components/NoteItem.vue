<template>
  <div @click="onClick" class="note" data-test="note">
    <div class="note-header">
      <div class="note-header-text">
        <h2 class="note-title">
          <span
            ><i
              v-show="note ? note.pinned : ''"
              class="fa-solid fa-thumbtack"
            ></i
            >{{ note.title }}</span
          >
          <span class="last-updated">{{ lastUpdated }}</span>
        </h2>
      </div>
    </div>
    <div class="preview-text">
      {{ previewText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";

export default defineComponent({
  name: "NoteItem",
  props: ["note"],
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
.note {
  background-color: $gray1;
  padding: 15px;
  margin-bottom: 10px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  user-select: none;

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
  @include flexbox(row, space-between, center);
  margin-bottom: 5px;
}

.preview-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.note-title,
.note-text {
  margin: 0;
}

.note-title {
  font-size: 1.3em;
  @include flexbox(column, center, flex-start);
}

.fa-thumbtack {
  font-size: 0.7em;
  margin-right: 8px;
}

.last-updated {
  font-weight: 300;
  font-size: 0.7em;
}
</style>
