import { shallowMount } from '@vue/test-utils'
import NoteForm from '@/components/NoteForm.vue';

test('sets the title value', async () => {
  const wrapper = shallowMount(NoteForm);
  const input = wrapper.find('input');

  await input.setValue('sample title');

  expect(input.element.value).toBe('sample title');
})





