<template>
	<div id="app" class="wrapper">
        <header class="header">
            <div class="header__from">From: {{ msg.from }}</div>
            <div class="header__to">To: {{ msg.to }}</div>
            <div class="header__subject">Subject: {{ msg.subject }}</div>
        </header>
        <main class="container">
            <div class="msg" v-html="'Body: ' + msg.body"></div>
            <div class="conversation" v-for="(msg, key) in msg.conversationHistory" :key="key">
                <div class="conversation__msg">
                   {{ msg.from }}: {{ msg.body }}
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios'

	export default {
		name: 'App',
		data() {
			return {
				msg: [],
			};
		},
        async mounted() {
            try {
                const { data } = await axios.get('http://sa-test-task-2022.s3-website.eu-north-1.amazonaws.com/messages');
                this.msg = data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        computed: {
            // msgBody() {
            //     return this.msg.body.replace(/\[([^\][]+)]/g, "<$1>");
            // }
        }
	};
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
