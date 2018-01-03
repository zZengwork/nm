<template>
	<div class="hra-wrap">
		<div class="qustion">
			<div class="title">如果您现在吸烟，有没有意愿及计划戒烟 ？</div>
			<checker v-model="select" default-item-class="hra" selected-item-class="hra-selected">
	        	<checker-item :value="item" v-for="(item, index) in items" :key="index">{{item.value}}</checker-item>
	      	</checker>
		</div>
	</div>
</template>
<script>
	import { Checker,CheckerItem } from '../../components/common/checker'
	export default {
		components: {
		    Checker,
		    CheckerItem,
		},
		data(){
			return{
				select: null,
				items: [{
			        key: '1',
			        value: 'A'
			      }, {
			        key: '2',
			        value: 'B'
			      }, {
			        key: '3',
			        value: 'C'
			      }, {
			        key: '4',
			        value: 'D'
			      }
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
<style lang="scss" scoped>
    @import 'src/style/common/mixin';
	.hra-wrap{
		height:100%;
		.qustion{
			width:100%;
			padding:0.32rem;
			padding-top:0.4rem;
			height:100%;
			@include bis('hra/dt_bg.jpg')
			.title{
				margin-bottom:0.4rem;
				font-size:0.32rem;
				text-align: left;
			}
			.hra {
			  	border: 1px solid $fc;
			  	padding: 0.12rem 0.3rem;
			  	margin-bottom: 0.4rem;
			  	width: 100%;
				@include borderRadius(0.5rem);
				text-align: left;
			  	font-size:0.28rem;
			}
			.hra-selected {
			  	border: 1px solid $tc;
			  	background-color:$tc;
			  	color:$fc;
			}
		}
	}
</style>