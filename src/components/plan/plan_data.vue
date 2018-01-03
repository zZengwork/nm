<template>
	<div class="plan_d">
		<div v-for="d in planD">
			<div class="number">{{d.number}}</div>
			<div class="name">{{d.name}}</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				planD:[
					{number:147,name:'HRA名次'},
					{number:36,name:'BMI'},
					{number:36,name:'营养'},
					{number:466,name:'运动'}
				]
			}
		},
		props:[
		],
		methods:{
			
		},
		watch:{

		},
		created(){

		}
	}
</script>
<style lang="scss">
	.plan_d{
		display:flex;
		justify-content:space-around;
		align-items: center;
		display:-webkit-flex;
		-webkit-justify-content:space-around;
		-webkit-align-items: center;
		padding:8px 0;
		background-color: #fff;
		div{
			width: 25%;
			display: flex;
			flex-direction: column;
			display: -webkit-flex;
			-webkit-flex-direction: column;
			justify-content: center;
			align-items: center;
			-webkit-justify-content: center;
			-webkit-align-items: center;
			text-align: center;
			.number{
				color: #fd9827;
				font-size:24px;
				margin-bottom: 4px;
				width: 100%;
			}
			.name{
				color: #2B3857;
				opacity: 0.3;
				font-size:13px;
				width: 100%;
			}
		}
	}

</style>