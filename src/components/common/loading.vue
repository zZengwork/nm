<template>
	<div class="container">
		<div class="box" v-if="loading">
			<div class="coffee_cup"></div>
			<div class="loader3"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'loading',
		data(){
			return{
				
			}
		},
		props:{
			loading:{
				type:[Boolean,String],
      			default:true
			}
		},
		methods:{
		},
		watch:{

		},
		created(){

		}
	}
</script>
<style scoped>	
	@import url(https://fonts.googleapis.com/css?family=Lato:300);
	.container{
		text-align: center;
		background-color: #fff;
		width:100%;
		height:100%;

	}
	/*coffee cup*/
	.coffee_cup{
	    width: 20px;
	    height: 24px;
	    border: 1px #fd9728 solid;
	    position:relative;
	    top:25%;
	    border-radius: 0px 0px 5px 5px;
	    position: relative;
	    margin: 36px auto;
	}
	.coffee_cup:after, .coffee_cup:before{
	    position: absolute;
	    content: "";
	}
	.coffee_cup:after{
	    width: 5px;
	    height: 12px;
	    border: 1px #fd9728 solid;
	    border-left: none;
	    border-radius: 0px 20px 20px 0px;
	    left: 20px;
	}
	.coffee_cup:before{
	    width: 1px;
	    height: 6px;
	    background-color: #fd9728;
	    top: -10px;
	    left: 4px;
	    box-shadow: 5px 0px 0px 0px #fd9728,
	                5px -5px 0px 0px #fd9728,
	                10px 0px 0px 0px #fd9728;
	    -webkit-animation: steam 1.2s linear infinite alternate;
	       -moz-animation: steam 1.2s linear infinite alternate;
	            animation: steam 1.2s linear infinite alternate;
	}

	@-webkit-keyframes steam{
	    0%{height: 0px;}
	    100%{height: 6px;}            
	}
	@-moz-keyframes steam{
	    0%{height: 0px}
	    100%{height: 6px;}            
	}
	@keyframes steam{
	    0%{height: 0px}
	    100%{height: 6px;}            
	}

	.box{
		height: 100%;
		width: 100%;
		float:left;
		position: relative;
		/*margin:0 -4px -5px -2px;*/
		transition: all .2s ease;
	}

		/* -------------- loader3 -------------- */

	.loader3{
		position: relative;
		width: 150px;
		height: 20px;
		top: 45%;
		top: -webkit-calc(30% - 30px);
		top: calc(30% - 30px);
		left: 25%;
		left: -webkit-calc(50% - 75px);
		left: calc(50% - 75px);
	}

	.loader3:after{
		content: "LOADING ...";
		color: #fd9728;
		font-family:  Lato,"Helvetica Neue" ;
		font-weight: 200;
		font-size: 16px;
		position: absolute;
		width: 100%;
		height: 20px;
		line-height: 20px;
		left: 0;
		top: 0;
		background-color: #fff;
		z-index: 1;
	}

	.loader3:before{
		content: "";
		position: absolute;
		background-color: #fd9728;
		top: -5px;
		left: 0px;
		height: 30px;
		width: 0px;
		z-index: 0;
		opacity: 1;
		-webkit-transform-origin:  100% 0%;
				transform-origin:  100% 0% ;
		-webkit-animation: loader3 3s ease-in-out infinite;
				animation: loader3 3s ease-in-out infinite;
	}

	@-webkit-keyframes loader3{
	    0%{width: 0px;}
	    70%{width: 100%; opacity: 1;}
	    90%{opacity: 0; width: 100%;}
	    100%{opacity: 0;width: 0px;}
	}

	@keyframes loader3{
	    0%{width: 0px;}
	    70%{width: 100%; opacity: 1;}
	    90%{opacity: 0; width: 100%;}
	    100%{opacity: 0;width: 0px;}
	}

</style>