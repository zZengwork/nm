<template>
	<div class="plan_list">
   		<ul>
   			<li v-for="p,index in planList" :class="{'weeks_unfinished':p.state==0,'weeks_underway':p.state==1,'weeks_finished':p.state==2}">
   				<div @click="go_content(index,p.mode_id,p.plan_id,p.plan_type_id,p.name,p.content,p.state)" class="learning_content" >
   					<div class="triangle" v-if= "p.state == 2">
						<i class="iconfont icon-wancheng1"></i>
   					</div>
   					<div class="left">
   						<div class="pic" :style="{backgroundImage:'url('+p.cover_image+')'}"></div>
   					</div>
   					<div class="center">
							<p class="weeks_title" v-text='p.name'></p>
							<p class="specific_week" v-text='p.week'></p>
   					</div>
   					<div class="right">
   						<i class="iconfont icon-weijiesuo" v-if="p.state == 0"></i>
   						<i class="iconfont icon-jt-you" v-else></i>
   					</div>
   				</div>
   			</li>
   		</ul>
		<router-link class="plan_no" v-show="(planList==null)" :to="{ path: '/'}" replace>暂无计划模块，试试点击一下吧</router-link>
	</div>
</template>
<script>
	export default {
		data() {
			return{
				spinner:false,
			}
		},
		props:[
		    'planList'
		],
		methods:{
			go_content:function(index,mode_id,plan_id,plan_type_id,name,content,state){
				let next_mode_id;
				console.log(index)
				if (index<this.planList.length-1) {
					next_mode_id = this.planList[index+1].mode_id
				}else{
					next_mode_id = null;
				}
				this.$emit('increment',index,mode_id,next_mode_id,plan_id,plan_type_id,name,content,state)
			}
		},
		watch:{

		},
		created(){
		}
	}
</script>
<style lang="scss" scoped>
	.plan_list{
		width:100%;
		padding:0;
		.plan_no{
			display:block;
			width:100%;
			text-align:center;
			padding:20px 0;
			color:#c4c4c4;
		}
		ul{
			width:100%;
			padding:6px 0;
			background:#f7f7f7;
			li{
				width:100%;
				padding: 6px  12px;
				.learning_content{
					width:100%;
					display:flex;
					height: 90px;
					display:-webkit-flex;
					position: relative;
					background: #FFFFFF;
					box-shadow: 0 0 6px 0 rgba(0,0,0,0.06);
					border-radius: 5px;
					overflow: hidden;
					.triangle{
						position: absolute;
						width:60px;
						height: 40px;
						left:-30px;
						top:-20px;
						background: #7ED321;
						box-shadow: 0 0 6px 0 rgba(0,0,0,0.06);
						border-radius: 5px;
						transform: rotate(-45deg);
						color: #FFFFFF;
						.iconfont{
							transform: rotate(45deg);
							position: relative;
							left: 22px;
							top: 20px;
							font-size: 15px;
						}
					}
					.left{
						width:90px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						display: -webkit-flex;
						-webkit-flex-direction: column;
						-webkit-justify-content: center;
						-webkit-align-items: center;
						.pic{
							width: 50px;
							height: 50px;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							display: -webkit-flex;
							-webkit-flex-direction: column;
							-webkit-justify-content: center;
							-webkit-align-items: center;
							background-size:50px 100px;
							background-position:0 0;
						}
					}
					.center{
						flex: 1;
						-webkit-flex: 1;
						overflow: hidden;
						display: flex;
						flex-direction: column;
						justify-content: center;
						display: -webkit-flex;
						-webkit-flex-direction: column;
						-webkit-justify-content: center;
						.weeks_title{
							font-size: 18px;
							font-weight: 600;
							margin-bottom: 6px;
							color: #4A4A4A;
						}
						.specific_week{
							font-size: 13px;
							color: #9B9B9B;
						}
					}
					.right{
						width: 50px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						display: -webkit-flex;
						-webkit-flex-direction: column;
						-webkit-justify-content: center;
						-webkit-align-items: center;
						.iconfont{
							color: #9B9B9B;
							font-size:18px;
						}
						.icon-weijiesuo{
							font-size:21px;
							color: #D4D4D4;
							padding-right:10px;
						}
					}
				}
			}
			.weeks_underway{
				.learning_content{
					border: 2px solid #FD9827;
					.left{
						.pic{
							background-position:0 -50px;
						}
					}
				}
			}
			.weeks_finished{
				.learning_content{
					.left{
						.pic{
							background-position:0 -50px;
						}
					}
				}
			}
		}
	}

</style>