import { shallowMount } from '@vue/test-utils'
import NoteItem from '@/components/NoteItem.vue';

const mockProps = {
  note: {
    title: 'sample title',
    text: 'sample text',
    id: 2,
    lastUpdated: new Date(),
    pinned: false
  },
  openNote: 55
}

test('emits an event when clicked', async () => {
  const wrapper = shallowMount(NoteItem, {
    props: mockProps
  });
  wrapper.find('[data-test="note"]').trigger('click');

  expect(wrapper.emitted()).toHaveProperty('set-open-note');
})
