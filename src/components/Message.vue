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
			<div class="msg-item__body" v-html="'<span>Body:</span>' + handleMsgBody(msg.body)"></div>
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

<style></style>
