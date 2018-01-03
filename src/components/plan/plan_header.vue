<template>
	<div class="plan_header">
		<header>
			<div class="hra_button">
				<div class="demo-chip hra_status" @click='go_hra' v-show="message.score" >
					<p v-text='message.score'></p><i class="iconfont icon-jt-you"></i>
			  	</div>
			</div>
			<div class="left">
				<div class="avatar">
					<img :src="message.company_avater">
				</div>
			</div>
			<div class="goal">
				<div  @click='go_target_save(target_save)' v-html='message.goal_text.goal' :class="{clickable:!target_save}">
				</div>
				<div v-html="message.goal_text.slogan">
				</div>
			</div>
		</header>
	</div>
</template>

<script>
	 export default {
		data() {
		    return {

		    }
		  },
		computed: {
			sys_config(){
				// return this.$store.state.sys_config
			},
	        target_save () {
		        // return this.$store.state.sys_config?  Number(this.$store.state.sys_config.user_information.target_save) : 0
		        return 0 ;
		    },
	    },		  
	    props:[
		  "message"
		],
		methods:{
			go_hra:function(){
				if(this.message.id != "")this.$router.push({path:'/hraTestReport',query: {alter_id:this.message.id}});
			},
			go_target_save:function(target_save){
				//用户修改计划口号和计划目标的权限
				// if (!target_save) {this.$router.push({path:'/determine_plan',query: {plan_type_id:this.sys_config.user_information.plan_type_id,plan_id:this.nm_msplan_id,plan_time:this.sys_config.user_information.plan_time}});}
			}
		},
		mounted(){
			if(localStorage.awbUser){
	     		var awbUser = JSON.parse(localStorage.awbUser)
				this.cid=awbUser.cid;
	     	}
		}
	}
</script>

<style lang='scss'>
	.plan_header{
		header{
			width:100%;
			height:120px;
			background-image: url('http://cdn.awbchina.com/wximage/h5/header.jpg');
			background-color: #fd9728;
		    background-size: cover;
			position:relative;
			display:flex;
			justify-content: center;
		    display:-webkit-flex;
	        -webkit-justify-content:center;
	        position: relative;
			div.hra_button{
				position: absolute;
				right: 0;
				top:12px;
				.hra_status{
					float: right;
					background-color: #CD7411;
					border-radius:0; 
					border-top-left-radius:25px; 
					border-bottom-left-radius:25px; 
					color: #fff;
					width: 110px;
					height: 25px;
					font-size: 13px;
					line-height: 25px;
					position: relative;
					i{
						font-size: 12px;
					    position: absolute;
					    right: 8px;
					    top: 50%;
					    margin-top: -5.25px;
					}
				}
			}
			.left{
				width: 120px;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				display: -webkit-flex;
				-webkit-justify-content: center;
				-webkit-align-items: center;
				.avatar{
					width: 72%;
					height: 72%;
					background: #fff;
					border-radius: 50%;
					border: 2px solid rgba(255,255,255,0.40);
					background:url('http://cdn.awbchina.com/wximage/h5/hra_avatar_default.png');
					background-size: 100% 100%;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
			.goal{
				flex: 1;
				-webkit-flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				display:-webkit-flex;
				-webkit-flex-direction: column;
        		-webkit-justify-content:center;
        		color: #fff;
				font-size: 13px;
				div{
					margin-bottom: 6px;
				}
				.clickable{
					/*border-bottom: 1px solid #fff;*/
				}
				span{
					font-size:24px;
					padding: 0 8px;
				}
				p{
					display: inline-block;
				}
			}
		
		}
	}
</style>
