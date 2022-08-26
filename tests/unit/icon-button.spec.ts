import { shallowMount } from '@vue/test-utils'
import IconButton from '@/components/IconButton.vue';

test('emits an event when clicked', async () => {
  const wrapper = shallowMount(IconButton, {
    props: {
      btn: {
        class: 'btn-red',
        icon: 'fa-x'
      }
    }
  });
  wrapper.find('button').trigger('click');

  expect(wrapper.emitted()).toHaveProperty('click');
})



