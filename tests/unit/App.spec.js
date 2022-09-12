import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import { mockMessage } from '../mocks/message';

import App from '@/App.vue';
import Header from '@/components/Header';
import Message from '@/components/Message';
import Form from '@/components/Form';
import Action from '@/components/Action';

jest.mock('axios', () => ({
	get: () => Promise.resolve({ data: mockMessage }),
}));

describe('App.vue', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallowMount(App);
		wrapper.setData({ messages: mockMessage });
	});

	test('sanity test', () => {
		expect(true).toBe(true);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('loads messages', () => {
		expect(wrapper.vm.messages).toEqual(mockMessage);
	});

	it('renders Header.vue', () => {
		expect(wrapper.findComponent(Header).exists()).toBe(true);
	});

	it('renders Message.vue', () => {
		expect(wrapper.findComponent(Message).exists()).toBe(true);
	});

	it('does not render Form.vue', () => {
		expect(wrapper.findComponent(Form).exists()).toBe(false);
	});

	it('renders Action.vue', () => {
		expect(wrapper.findComponent(Action).exists()).toBe(true);
	});

	it('renders Form.vue', async () => {
		await wrapper.setData({ showForm: true });
		expect(wrapper.findComponent(Form).exists()).toBe(true);
	});

	it('adds a message', async () => {
		const payload = {
			messageId: '8666a909-fa97-4a88-abeb-7ffed51c59b0-foo',
			from: 'bengtinho.mullvadsson@gmail.com',
			to: 'jensinho.undulatsson@gmail.com,bengtinho.mullvadsson@gmail.com',
			subject: 'Re(3): The iPhone 14 and 14 Plus are official',
			body: '[b]The new iPhone[/b], just like the old iPhone 😅',
		};
		const msgs = wrapper.vm.messages.conversationHistory;
		await wrapper.vm.addMsg(payload);
		expect(msgs).toHaveLength(5);
	});

	it('deletes a message', async () => {
		const payload = {
			messageId: '8666a909-fa97-4a88-abeb-7ffed51c59b0-foo',
			from: 'bengtinho.mullvadsson@gmail.com',
			to: 'jensinho.undulatsson@gmail.com,bengtinho.mullvadsson@gmail.com',
			subject: 'Re(3): The iPhone 14 and 14 Plus are official',
			body: '[b]The new iPhone[/b], just like the old iPhone 😅',
		};

		const msgs = wrapper.vm.messages.conversationHistory;
		await wrapper.vm.deleteMsg(payload.messageId);
		expect(msgs).toHaveLength(4);
	});
});
