<template>
	<div class="default">
      	<loading></loading>
	</div>
</template>
<script>
  	import loading from '../components/common/loading'
	export default {
		components:{
	      	loading
	    },
		data(){
			return{
			}
		},
		props:[
		],
		methods:{
			
		},
		watch:{

		},
		created(){
			this.$router.replace({path: '/plan'});
		}
	}
</script>
<style>
	.default{
		width: 100%;
		height: 100%;
	}
</style>