<template>
	<div class="wrapper_plan">
		<plan-header :message="message"></plan-header>
		<plan-data :message="message"></plan-data>
		<slide-rule :num.sync = "num" ></slide-rule>
		<!-- <section>
			<plan-list :planList="plan_texts" @increment="go_content"></plan-list>
			<spinner :spinner="spinner"></spinner>
		</section> -->
	</div>
</template>
<script>
	import api from '@/api';
	import planHeader from '../../components/plan/plan_header'
	import planList from '../../components/plan/plan_list'
	import planData from '../../components/plan/plan_data'
	import SlideRule from '../../components/common/slide-rule'
	import spinner from '../../components/common/spinner'
	export default {
	 	components:{
	 		planHeader,
	 		planList,
	 		planData,
	 		SlideRule,
	 		spinner
	 	},
		data() {
		    return {
		    	nm_api_plan_view:'',
		    	num:0,
		    	cid:'',
		    	uid:'',
		    	name:'',
		    	score:'',
		      	weight:"0",
		      	token:'',
		      	plan_texts:[
		      	],
		      	spinner:true,
		      	message:{
		      		score:'',
		      		goal_text:{
		      			goal:'',
		      			slogan:''
		      		},
		      		id:'',
		    		backg_show:false,
		    		clickable:true,
		    		company_avater:null,
		    		company_backg:null
		      	}
		    }
		  },
		  methods:{
		  	go_content:function(index,mode_id,next_mode_id,plan_id,plan_type_id,name,content,state){
		  		var _this = this;
		  		console.log(next_mode_id)
		  		if (state==1 || state == 2 ) {
		  			_this.$router.push({path:'/module_content',query: {mode_id:mode_id,next_mode_id:next_mode_id,plan_id:plan_id,plan_type_id:plan_type_id,state:state,name:name,content:content}})
		  		}else{
		  			alert('该周未开启')
		  		}
		  	},
	      	go_hra:function(){
				// var _this = this;
    //   			var nm_api_survey_answer = _this.nm_api_plan_view + '/survey_answer/get_current' ;
    //   			var nm_api_user = _this.nm_api_plan_view + '/user/get' ;
				// $.get(nm_api_survey_answer + '?uid='+_this.uid+'&token='+_this.token,function(response){
    // 				let res = response;
    // 				if(res.data){
	   //  				_this.alter_id = res.data[0].id;
	   //  				_this.go_page = res.data[0].page+1;
				// 		localStorage.setItem('alter_id',_this.alter_id)
				// 		_this.$router.push({path: '/hraTest'+_this.go_page});
    // 				}else{
    // 					localStorage.setItem('alter_id','')
    // 					$.get(nm_api_user + '?id='+_this.uid+'&token='+_this.token,function(response){
				//             let res = response;
				//             if(res.data){
				// 				if(res.data.name){
				// 					_this.$router.push({path: '/hraTest1'});
				// 				}else{
				// 					_this.$router.push({path: '/information'});
				// 				}									
				//             }
				//         })
    // 				}
				// });
			},
	      	get_hra_data:function(){
				var _this = this;
      			api.hra_data(_this.last_alter_id).then(res => {
    				var res = res.data;
    				if(res.data){						
		  				_this.message.id = res.data.id;
		  				_this.message.score = 'HRA：' + res.data.score + ' 分'
					}else{
		  				_this.spinner = false;
		  				_this.message.score = 'HRA未评估';
					}
				});
			},
	      	get_hra_last:function(){
     			var _this = this;
      			api.hra_last(_this.uid).then(res => {
    				var res = res.data;
    				if (res.data) {
		  				_this.spinner = false;
    					_this.last_alter_id = res.data[0].id
        				_this.get_hra_data();
    				}else{
		  				_this.spinner = false;
		  				_this.message.score = 'HRA未评估'
						_this.message.goal_text = ""
    				}
				});
     		},
	      	get_plan:function(){
	      		var _this = this;
	      		api.get_plan(_this.uid).then(res => {
	      			var res = res.data;
  					_this.spinner = false;
  					res.data.plan_type_id = res.data.plan_type_id ? res.data.plan_type_id : null;
	  				_this.get_mode(res.data.plan_type_id)
					if (res.data.state == 0 ) {
						_this.message.goal_text = "";
						return false
					}				
					_this.message.backg_show = true;
					if (res.data.plan_type_id ==1) {
						if(res.data.value === null) _this.message.goal_text.goal = "<em>目标：体重</em><span>"+res.data.value+"</span><em>公斤</em>"
					}else if (res.data.plan_type_id == 2) {
						if(res.data.value === null) _this.message.goal_text.goal = "<span style='font-size:30px'>目标：&le;6.5%</span>"
					}else if (res.data.plan_type_id == 3) {
						if(res.data.value === null) _this.message.goal_text.goal = "<em>目标：活力</em><span>"+res.data.value+"</span><em>分</em>"
					}
					if(res.data.slogan) _this.message.goal_text.slogan = "<p>口号："+res.data.slogan+"</p>"
				});
	      	},
	      	get_mode:function(type_id){
	      		var _this = this;
	      		api.plan_mode(_this.cid,_this.uid,type_id).then(res => {
      				var res = res.data;
    				if (res.data) {
    					_this.plan_texts = res.data;
    				}else{
    					_this.plan_texts = null;
    				}
				});
	      	},
	      	get_company:function(){
	      		var _this = this;
	      		api.company_info(_this.cid).then(res => {
      				var res = res.data;
					_this.message.company_avater = res.data.logo_url;
					_this.message.company_backg = res.data.header_url;
					_this.message.name = res.data.name;
				});
	      	}
	      },
	     created(){
	     	var _this = this;
			// if(localStorage.awbUser){
	     		// var awb_user = JSON.parse(localStorage.awbUser)
			_this.mobile=18079600788;
			_this.cid=30;
			_this.uid=27366;
	     	// }  
			_this.get_plan()
		  	_this.get_hra_last();
		  	_this.get_company()
	    }
	}
</script>

<style scoped="" lang="scss" type="text/css">
	@import "../../style/page/plan.scss";
</style>