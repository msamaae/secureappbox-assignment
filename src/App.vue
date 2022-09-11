<template>
	<div id="app" class="wrapper">
		<Header :message="messages" />
		<Message :messages="messages.conversationHistory" />
		<Form v-show="showForm" />
		<Action v-show="!showForm" />
	</div>
</template>

<script>
	import axios from 'axios';
	import { eventBus } from '@/eventBus';

	import Header from '@/components/Header.vue';
	import Message from '@/components/Message.vue';
	import Form from '@/components/Form.vue';
	import Action from '@/components/Action.vue';

	export default {
		name: 'App',
		components: {
			Header,
			Message,
			Form,
			Action,
		},
		data() {
			return {
				messages: [],
                showForm: false
			};
		},
		created() {
			eventBus.$on('delete-msg', id => this.deleteMsg(id));
			eventBus.$on('reply-msg', payload => this.showForm = payload);
		},
		beforeDestroy() {
			eventBus.$off('delete-msg');
			eventBus.$off('reply-msg');
		},
		async mounted() {
			try {
				const { data } = await axios.get(
					'http://sa-test-task-2022.s3-website.eu-north-1.amazonaws.com/messages'
				);
				console.log(data);
				this.messages = data;
			} catch (error) {
				console.error(error);
				throw error;
			}
		},

		methods: {
			reply() {},
			deleteMsg(id) {
				const found = this.messages.conversationHistory.map(msg => msg.messageId).indexOf(id);

				this.messages.conversationHistory.splice(found, 1);
			},
		},
	};
</script>

<style lang="scss">
	* {
		box-sizing: 0;
		margin: 0;
		padding: 0;
	}

	body {
		padding: 1rem;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
		margin-top: 60px;
	}

	.wrapper {
		max-width: 45em;
		padding: 1rem;
		margin: 0 auto;
		overflow-wrap: break-word;

		& .header {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			& span {
				font-weight: bold;
			}
		}

		& .msg-wrapper {
			margin-top: 2rem;
		}

		& .msg-item {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.125);
			border: 1px solid rgba(0, 0, 0, 0.1);
			margin-bottom: 1rem;
			border-radius: 1rem;
			padding: 1rem;

			& span {
				font-weight: bold;
			}

			&__from {
				display: flex;
				justify-content: space-between;

				& .delete {
					cursor: pointer;
					color: firebrick;

					&:hover {
						color: rgb(218, 21, 21);
					}
				}
			}
		}

		
	}
</style>
