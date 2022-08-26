<template>home</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  props: ["notes"],
  emits: ["add-note", "toggle-pin", "edit-note", "delete-note"],
});
</script>
