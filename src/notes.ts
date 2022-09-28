import { reactive, watch } from 'vue';
import { Note } from "./types/custom-types.js";

export const notes = reactive({
  list: [] as Note[],
  noteDetailId: 0,
  noteDetail: {},
  addNote(newNote: Note) {
    this.list = [newNote, ...this.list]; // most recent first
  },
  deleteNote(id: number) {
    this.list = this.list.filter((note) => note.id !== id);
  },
  editNote(editedNote: Note) {
    this.list = [
      editedNote,
      ...this.list.filter((note) => note.id !== editedNote.id), // most recently updated first
    ];
  },
  togglePin(id: number) {
    this.list = this.list.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
  },
  setLocalStorageNotes() {
    localStorage.setItem("notes", JSON.stringify(notes.list));
  },
  getLocalStorageNotes() {
    const localNotes = localStorage.getItem('notes');
    if (localNotes) {
      this.list = JSON.parse(localNotes);
    }
  },
})

watch(
  () => notes.list,
  () => {
    notes.setLocalStorageNotes();
  }
)