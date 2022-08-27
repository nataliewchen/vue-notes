import { createRouter, createWebHistory } from 'vue-router'
import NotesHomeView from '../views/NotesHomeView.vue'
import AddNoteView from '../views/AddNoteView.vue'
import NoteDetailView from '../views/NoteDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'NotesHomeView',
    component: NotesHomeView,
    children: [
      {
        path: 'new',
        component: AddNoteView
      },
      {
        path: ':id',
        component: NoteDetailView,
      },
    ]
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router