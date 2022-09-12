<template>
	<div class="msg-wrapper">
		<div class="msg-item" v-for="(msg, key) in messages" :key="key">
			<div>
				<div class="msg-item__from">
					<div><b>From: </b> {{ msg.from }}</div>
					<div class="delete" @click="deleteMsg(msg.messageId)">&#x2716;</div>
				</div>
				<div class="msg-item__to"><span>To:</span> {{ msg.to }}</div>
			</div>
			<div class="msg-item__subject"><span>Subject:</span> {{ msg.subject }}</div>
			<div class="msg-item__body" v-html="'<span>Body: </span>' + handleMsgBody(msg.body)"></div>
		</div>
	</div>
</template>

<script>
	import { eventBus } from '@/eventBus';

	export default {
		name: 'Message',
		props: {
			messages: {
				type: Object | Array,
				required: true,
			},
		},
		methods: {
			deleteMsg(id) {
				eventBus.$emit('delete-msg', id);
			},
			handleMsgBody(str) {
				if (str) {
					return str.replace(/\[([^\][]+)]/g, '<$1>');
				}
			},
		},
	};
</script>

<style lang="scss">
	.msg-wrapper {
		margin-top: 2rem;

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
