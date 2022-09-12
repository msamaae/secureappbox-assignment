<template>
	<header class="header">
		<h1 class="header__title">{{ message.subject }}</h1>
		<div>
			<div class="header__from"><span>From:</span> {{ message.from }}</div>
			<div class="header__to"><span>To:</span> {{ message.to }}</div>
		</div>
		<div class="header__body" v-html="'<span>Body: </span>' + handleMsgBody(message.body)"></div>
	</header>
</template>

<script>
	export default {
		name: 'Header',
		props: {
			message: {
				type: Object | Array,
				required: true,
			},
		},
		methods: {
			handleMsgBody(str) {
				if (str) {
					return str.replace(/\[([^\][]+)]/g, '<$1>');
				}
			},
		},
	};
</script>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		& span {
			font-weight: bold;
		}
	}
</style>
