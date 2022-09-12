import { shallowMount } from '@vue/test-utils';
import Action from '@/components/Action.vue';

describe('Action.vue', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallowMount(Action);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('emits the actions', async () => {
		wrapper.vm.$emit('reply-btn', true);
		wrapper.vm.$emit('forward-btn', true);

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('reply-btn')).toBeTruthy();
		expect(wrapper.emitted('forward-btn')).toBeTruthy();

		expect(wrapper.emitted('reply-btn').length).toBe(1);
		expect(wrapper.emitted('forward-btn').length).toBe(1);
	});
});
