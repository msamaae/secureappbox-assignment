<template>
	<form action="#" class="form" @click.prevent="replyMsg" @keyup.prevent.enter="replyMsg">
		<div class="form__close" @click="closeForm">&#x2716;</div>
		<div class="form__to">
			<label for="to">To</label>
			<input type="text" name="to" v-model="to" />
		</div>
		<div class="form__body">
			<label for="body">Body</label>
			<textarea name="body" id="" cols="30" rows="10" v-model="body" />
		</div>
		<Button name="Send" />
	</form>
</template>

<script>
	import { eventBus } from '@/eventBus';
	import Button from '@/components/Button.vue';

	export default {
		name: 'Form',
		components: { Button },
		props: {
			message: {
				type: Array | Object,
				required: true,
			},
		},
		data() {
			return {
				messageId: '',
				from: this.message.from,
				to: '',
				body: '',
			};
		},
		methods: {
			uid() {
				return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '');
			},
			closeForm() {
				eventBus.$emit('close-form', false);
			},
			replyMsg() {
				if (!(this.to.trim().length && this.body.trim().length)) return;

				eventBus.$emit('reply-msg', {
					messageId: this.uid(),
					from: this.from,
					to: this.to,
					subject: `Re(${this.message.conversationHistory.length}): The iPhone 14 and 14 Plus are official`,
					body: this.body,
				});
			},
		},
	};
</script>

<style lang="scss">
	.form {
        margin-top: 3rem;
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

		&__close {
			display: flex;
			justify-content: end;
			padding-bottom: 0.5rem;
			cursor: pointer;
		}

		& label {
			font-weight: bold;
		}

		& input,
		textarea {
			min-width: 100%;
			margin-bottom: 0.675rem;
		}
	}
</style>
