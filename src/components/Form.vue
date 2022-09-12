<template>
	<form action="#" class="form" @submit.prevent="addMsg"> 
		<div class="form__close" @click="closeForm">&#x2716;</div>
		<div class="form__to">
			<label for="to">To</label>
			<input type="text" name="to" v-model="to" />
		</div>
		<div class="form__body">
			<label for="body">Body</label>
			<VueEditor class="editor" v-model="body" />
		</div>
		<Button name="Send" />
	</form>
</template>

<script>
	import { VueEditor } from 'vue2-editor';
	import { eventBus } from '@/eventBus';
	import Button from '@/components/Button.vue';

	export default {
		name: 'Form',
		components: {
			VueEditor,
			Button,
		},
		props: {
			message: {
				type: Array | Object,
				required: true,
			},
			forward: {
				type: Boolean,
				required: true,
			},
		},
		data() {
			return {
				messageId: '',
				from: this.message.from,
				to: '',
				body: '',
				content: '',
			};
		},
		mounted() {
			if (this.forward) {
				this.message.conversationHistory.map(msg => {
                    const msgBody = msg.body.replace(/<p>/g, '').replace(/<\/p>/g, '');
					this.body += `<span><i>From: </i>${msg.from}</span><span><i>To: </i>${msg.to}</span><span><i>Subject: </i>${msg.subject}</span><span><i>Body: </i>${msgBody}</span><br>`;
				});
			}
		},
		methods: {
			msgId() {
				return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '');
			},
			handleMsgBody(str) {
				if (str) {
					return str.replace(/\[([^\][]+)]/g, '<$1>');
				}
			},
			closeForm() {
				eventBus.$emit('close-form', false);
			},
			addMsg() {
				if (!(this.to.trim().length && this.body.trim().length)) return;

				if (this.forward) {
					eventBus.$emit('add-msg', {
						messageId: this.msgId(),
						from: this.from,
						to: this.to,
						subject: `Re(${this.message.conversationHistory.length}): The iPhone 14 and 14 Plus are official`,
						body: '<br>-----Forwarded message-----<br>' + this.body,
					});
				} else {
					eventBus.$emit('add-msg', {
						messageId: this.msgId(),
						from: this.from,
						to: this.to,
						subject: `Re(${this.message.conversationHistory.length}): The iPhone 14 and 14 Plus are official`,
						body: this.body,
					});
				}

				this.closeForm();
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

		& .editor {
			padding: 0.2rem 0 1rem;
		}
	}
</style>
