import { shallowMount } from '@vue/test-utils';
import Header from '@/components/Header.vue';
import { mockMessage } from '../mocks/message';

describe('Header.vue', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallowMount(Header, {
			propsData: {
				message: mockMessage,
			},
		});
	});

	test('sanity test', () => {
		expect(true).toBe(true);
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});

    it('renders props.message' , () => {
        const msg = wrapper.vm.message;

        expect(wrapper.find('.header__title').text()).toMatch(msg.subject);
        expect(wrapper.find('.header__from').text()).toMatch(msg.from);
        expect(wrapper.find('.header__to').text()).toMatch(msg.to);
        expect(wrapper.find('.header__body').text()).toMatch('Body: ', msg.body);
    })
});
