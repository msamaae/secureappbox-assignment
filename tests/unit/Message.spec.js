import { shallowMount } from '@vue/test-utils';
import Message from '@/components/Message.vue';
import { mockMessage } from '../mocks/message';

describe('Message.vue', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallowMount(Message, {
			propsData: {
				messages: mockMessage.conversationHistory,
			},
		});
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});

    it('renders props.messages' , () => {
        const msg = wrapper.vm.messages;

        expect(wrapper.find('.msg-item__from').text()).toMatch(msg[0].from);
        expect(wrapper.find('.msg-item__to').text()).toMatch(msg[0].to);
        expect(wrapper.find('.msg-item__subject').text()).toMatch(msg[0].subject);
        expect(wrapper.find('.msg-item__body').text()).toMatch('Body: ', msg[0].body);
    })

    it('renders 4 messages initially', () => {
        expect(wrapper.vm.messages).toHaveLength(4);
    })
});
