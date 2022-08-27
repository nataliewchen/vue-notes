import { shallowMount } from '@vue/test-utils'
import NoteItem from '@/components/NoteItem.vue';

test('renders the note text and title', () => {
  const wrapper = shallowMount(NoteItem, {
    props: {
      note: {
        title: 'my note',
        text: 'testing for rendered text',
        id: Date.now(),
        lastUpdated: new Date(),
        pinned: false
      }
    }
  });
  
  expect(wrapper.html()).toContain('my note')
  expect(wrapper.html()).toContain('testing for rendered text')
})