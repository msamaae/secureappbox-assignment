import { shallowMount } from '@vue/test-utils';
import Form from '@/components/Form.vue';
import { mockMessage } from '../mocks/message';

describe('Form.vue', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallowMount(Form, {
			propsData: {
				message: mockMessage,
				forward: false,
			},
		});
	});

	it('exists', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it('emits events', async () => {
		const payload = {
			messageId: '8666a909-fa97-4a88-abeb-7ffed51c59b0',
			from: 'bengtinho.mullvadsson@gmail.com',
			to: 'jensinho.undulatsson@gmail.com,bengtinho.mullvadsson@gmail.com',
			subject: 'Re(3): The iPhone 14 and 14 Plus are official',
			body: '[b]The new iPhone[/b], just like the old iPhone 😅',
		};

		wrapper.vm.$emit('close-form', false);
		wrapper.vm.$emit('add-msg', payload);

		await wrapper.vm.$nextTick();

		expect(wrapper.emitted('close-form')).toBeTruthy();
		expect(wrapper.emitted('add-msg')).toBeTruthy();

		expect(wrapper.emitted('close-form').length).toBe(1);
		expect(wrapper.emitted('add-msg').length).toBe(1);

		expect(wrapper.emitted('close-form')[0]).toEqual([false]);
		expect(wrapper.emitted('add-msg')[0]).toEqual([payload]);
	});

    it('renders reply form', () => {
        expect(wrapper.vm.body).toEqual('');
        expect(wrapper.vm.forward).toBeFalsy();
    })

    it('renders forward form', async () => {
        await wrapper.setProps({ forward: true });
        expect(wrapper.vm.forward).toBeTruthy();
    })
});
