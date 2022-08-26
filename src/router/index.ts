import { createRouter, createWebHistory } from 'vue-router'
import NotesHomeView from '../views/NotesHomeView.vue'
import AddNoteView from '../views/AddNoteView.vue'
import NoteDetailView from '../views/NoteDetailView.vue'
const routes = [
  {
    path: '/',
    name: 'NotesHomeView',
    component: NotesHomeView,
        // components: {
    //   default: AddNoteView,
    //   AddNoteView: AddNoteView
    // }
    children: [
      {
        path: 'new',
        component: AddNoteView
      },
      {
        path: ':id',
        component: NoteDetailView
      }
    ]
  },
  // {
  //   path: '/new',
  //   name: 'AddNoteView',
  //   component: AddNoteView
  //   // components: {
  //   //   default: AddNoteView,
  //   //   AddNoteView: AddNoteView
  //   // }
  // },
  // {
  //   path: '/:id',
  //   name: 'NoteDetailView',
  //   component: NoteDetailView,
  // },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router