import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallowMount(Button, {
			propsData: {
				name: '',
			},
		});
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('renders props.name', async () => {
		await wrapper.setProps({ name: 'send' });
		expect(wrapper.vm.name).toBe('send');
	});
});
