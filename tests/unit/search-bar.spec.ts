import { shallowMount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue';

test('clears input when button clicked', async() => {
  const wrapper = shallowMount(SearchBar);
  const input = wrapper.find('input');
  
  await input.setValue('search query');
  expect(input.element.value).toBe('search query');

  await wrapper.find('[data-test="clear-search"]').trigger('click');
  expect(input.element.value).toBe('');
})
