<template>
	<div class="action">
		<button class="action__reply" @click="handleReply">Reply</button>
		<button class="action__forward" @click="handleForward">Forward</button>
	</div>
</template>

<script>
	import { eventBus } from '@/eventBus';

	export default {
		name: 'Action',
		methods: {
			handleReply() {
                eventBus.$emit('reply-btn', true);
            },
            handleForward() {
                eventBus.$emit('forward-btn', true);
            }
		},
	};
</script>

<style lang="scss">
	.action {
		padding: 0.5rem;

		& button {
			padding: 0.725rem 1.25rem;
			margin-right: 1rem;
			text-transform: uppercase;
			font-weight: bold;
			border: none;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
			border-radius: 0.425rem;
			background: #4361ee;
			color: #fff;
			letter-spacing: 0.125rem;
			cursor: pointer;

			&:hover {
				background: #2a40a2;
			}
		}
	}
</style>
