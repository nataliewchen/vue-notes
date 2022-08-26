<template>
  <ContentModal @backdrop-click="closeModal">
    <h2>{{ note.title }}</h2>
    <h5>{{ note.lastUpdated }}</h5>
    {{ note.title }}
    <br />
    {{ note.text }}
  </ContentModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";
import ContentModal from "../components/ContentModal.vue";

interface Note {
  title: string;
  text: string;
  id: number;
  lastUpdated: Date;
  pinned: boolean;
}

export default defineComponent({
  name: "NoteDetailView",
  components: { ContentModal },
  props: ["notes"],
  methods: {
    closeModal() {
      this.$router.back();
    },
  },
  data() {
    return {
      note: null,
    };
  },
  created() {
    console.log("created detail view");
    this.note = this.notes.find(
      (note: Note) => note.id === Number(this.$route.params.id)
    );
  },
  computed: {
    // lastUpdated() {
    //   if (typeof this.note === 'object' && this.note) {
    //     return dayjs(this.note.lastUpdated).format("M/DD/YY");
    //   }
    // },
  },
  // note() {
  //   return this.notes.find(
  //     (note: Note) => note.id === Number(this.$route.params.id)
  //   );
  // },
});
</script>
