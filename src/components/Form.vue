<template>
	<form action="#" class="form" @click.prevent="send">
		<div class="form__close">&#x2716;</div>

		<div class="form__from">
			<label for="from">From</label>
			<input type="text" name="from" />
		</div>
		<div class="form__to">
			<label for="to">To</label>
			<input type="text" name="to" />
		</div>
		<div class="form__subject">
			<label for="subject">Subject</label>
			<input type="text" name="subject" />
		</div>
		<div class="form__body">
			<label for="body">Body</label>
			<textarea name="body" id="" cols="30" rows="10"></textarea>
		</div>
		<Button name="Send" />
	</form>
</template>

<script>
	import Button from '@/components/Button.vue';

	export default {
		name: 'Form',
		components: { Button },
		methods: {
			send() {
				console.log('object');
			},
		},
	};
</script>

<style lang="scss">

	.form {
        /* border: 2px solid red; */
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

        &__close {
            display: flex;
            justify-content: end;
            padding-bottom: .5rem;
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
