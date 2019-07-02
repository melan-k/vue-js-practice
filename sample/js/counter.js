new Vue({
    el: '#app',
    data: {
		show: true
	},
	methods: {
		handleClick() {
			const count = this.$refs.count;
			if (count) {
				count.innerText = parseInt(count.innerText, 10) + 1
			}
		}
	}
})