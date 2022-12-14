import { shallowMount } from '@vue/test-utils'
import ContentModal from '@/components/ContentModal.vue';

test('renders default slot in modal', () => {
  const wrapper = shallowMount(ContentModal, {
    slots: {
      default: 'slotted content'
    },
  });

  expect(wrapper.html()).toContain('slotted content');
})
