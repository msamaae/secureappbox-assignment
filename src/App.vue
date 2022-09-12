<template>
	<div id="app" class="wrapper">
		<Header :message="messages" />
		<Message :messages="messages.conversationHistory" />
		<Form v-if="showForm" :message="messages" :forward="forward" />
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
				showForm: false,
				forward: false,
			};
		},
		created() {
			eventBus.$on('add-msg', msg => this.addMsg(msg));
			eventBus.$on('delete-msg', id => this.deleteMsg(id));

			eventBus.$on('close-form', payload => (this.showForm = payload));
			eventBus.$on('reply-btn', payload => {
				this.showForm = payload;
				this.forward = false;
			});
			eventBus.$on('forward-btn', payload => {
				this.showForm = payload;
				this.forward = payload;
			});
		},
		beforeDestroy() {
			eventBus.$off('add-msg');
			eventBus.$off('delete-msg');

			eventBus.$off('close-form');
			eventBus.$off('reply-btn');
			eventBus.$off('forward-btn');
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
			addMsg(msg) {
				this.messages.conversationHistory.push(msg);
			},
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
	}
</style>
