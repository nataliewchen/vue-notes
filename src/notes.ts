import { reactive } from 'vue';
import { Note } from "./types/custom-types.js";

export const notes = reactive({
  list: [] as Note[],
  addNote(newNote: Note) {
    this.list = [newNote, ...this.list]; // most recent first
    this.setLocalStorageNotes();
  },
  deleteNote(id: number) {
    this.list = this.list.filter((note) => note.id !== id);
    this.setLocalStorageNotes();
  },
  editNote(editedNote: Note) {
    this.list = [
      editedNote,
      ...this.list.filter((note) => note.id !== editedNote.id), // most recently updated first
    ];
    this.setLocalStorageNotes();
  },
  togglePin(id: number) {
    this.list = this.list.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    this.setLocalStorageNotes();
  },
  setLocalStorageNotes() {
    localStorage.setItem("notes", JSON.stringify(notes.list));
  },
  getLocalStorageNotes() {
    const localNotes = localStorage.getItem('notes');
    if (localNotes) {
      this.list = JSON.parse(localNotes);
    }
  }
})