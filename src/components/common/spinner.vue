<template>
    <div class="spinner" v-if="spinner">
   		<span class="dot dot-1"></span> 
  	 	<span class="dot dot-2"></span> 
   	 	<span class="dot dot-3"></span> 
   	</div>
</template>
<script>
	export default {
	    data() {
	      return {}
	    },
	    props:{
			spinner:{
				type:[Boolean,String],
      			default:true
			}
		},
	    mounted: function() {   
	        
	    }
    }
</script>
<style scoped lang="scss">
	.spinner {
	    padding: 14px;
	    text-align: center;
	    .dot {
		    display: inline-block;
		    width: 10px;
		    height: 10px;
		    margin: 0 3px;
		    background-color: #ccc;
		    border-radius: 100%;
		    -webkit-animation: bounce 1.5s infinite ease-in-out;
		    animation: bounce 1.5s infinite ease-in-out;
		    -webkit-animation-fill-mode: both;
		    animation-fill-mode: both;
		    @keyframes bounce{
		    	0%, 80%, 100% {
			    -webkit-transform: scale(0);
			    transform: scale(0);
			}

			40% {
			    -webkit-transform: scale(1);
			    transform: scale(1);
				}
		    }
		}
	    .dot-1 {
		    -webkit-animation-delay: -.32s;
		    animation-delay: -.32s;
		}
		.dot-2 {
		    -webkit-animation-delay: -.16s;
		    animation-delay: -.16s;
		}
	}
</style>