<template>
	<div>
		<div class="rule_number"><span>{{rule_number}}</span></div>
		<div class="slide_rule" :style="{width:ruleWidth + 'px'}">
			<div class="slide_wrappar"  @touchstart="ruleTouchstart($event)" @touchmove="ruleTouchmove($event)"@touchend="ruleTouchend($event)">
				<div class="rule" :style="{
						transform:'translate3d('+finalOffset+'px,0,0)',
						webkitTransform:'translate3d('+finalOffset+'px,0, 0)'
					}">
					<ul>
						<li v-for="r in ruleVal" :class="{integer:!(r%10)}">
							<span>&nbsp;</span>
						</li>
					</ul>
					<ol>
						<li v-for="r in ruleVal" :class="{integer:!(r%10)}">
							<span v-if="!(r%10)">
								{{r}}
							</span>
							<span v-else>&nbsp;</span>
						</li>
					</ol>
				</div>
				<em class="calibration"></em>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				val:[],
				startX:'',
				endX:'',
				offsetSum:'',
				finalOffset: this.ruleWidth / 2 -10,
				firstOffset: this.ruleWidth / 2 -10,
				endOffset: - (this.max- this.min) * (this.rulegrid + 1) - Math.ceil((this.max - this.min) / 10 ) + (this.ruleWidth / 2 -10),
				sl:180,
			}
		},
		props:{
			ruleWidth:{
		    	type:[Number,String],
		    	default:360
		    },
		    rulegrid:{
		    	type:[Number,String],
		    	default:16
		    },
		    ruleMultiple:{
				type:[Number,String],
		    	default:10
		    },
		    min:{
		    	type:[Number,String],
		    	default:0
		    },
		    max:{
		    	type:[Number,String],
		    	default:100,
		    },
		    num:{
		    	type:[Number,String],
		    	default:function () {  
		          return this.min  
		        }  
		    }
		},
		methods:{
			pushNum(val,min,max){
				val.push(min);
				if(min<this.max){
					min ++
					this.pushNum(val,min,max)
					return val;
				}
			},
			ruleTouchstart(event){
				this.startX = event.touches[0].clientX;
				this.oldMoveX = this.startX;
				this.timeStart =  event.timeStamp
			},
			ruleTouchmove(event){
				// event.preventDefault();
				var _this = this;
				this.moveX = event.touches[0].clientX;
				this.offset = this.moveX - this.oldMoveX;
				// if(this.finalOffset > this.firstOffset){
				// 	this.finalOffset *= this.sl / (this.sl + this.finalOffset)
				// 	return false;
				// }
				// if(this.finalOffset < this.endOffset){
				// 	this.finalOffset *= this.sl / (this.sl + this.finalOffset)
				// 	return false;
				// }
				this.finalOffset = this.finalOffset + this.offset;
				this.oldMoveX = this.moveX;
				_this.$emit('update:num', _this.setNum())
			},
			ruleCritical(){
				var _this = this;
				if(_this.finalOffset > _this.firstOffset){
					_this.easeout(_this.finalOffset, _this.firstOffset, 6, function(value) {
			　　　　	_this.finalOffset = value;
			　　　　});
					return false;
				}
				if(_this.finalOffset < _this.endOffset){
					_this.easeout(_this.finalOffset, _this.endOffset, 6, function(value) {
			　　　　	_this.finalOffset = value;
			　　　　});
					return false;
				}
			},
			ruleTouchend(event){
				var _this = this
				_this.endX = event.changedTouches[0].clientX
				_this.offsetSum = _this.endX - _this.startX;
				_this.timeEnd =  event.timeStamp
				_this.timeOffset = _this.timeEnd - _this.timeStart 
				console.log(Math.abs(_this.offsetSum/_this.timeOffset))
				_this.ruleCritical()//超过临界值
			// 	if(Math.abs(_this.offsetSum/_this.timeOffset) > 1){
			// 		var fin = _this.finalOffset + _this.offsetSum
			// 		if(fin > _this.firstOffset){
			// 			fin =  _this.firstOffset
			// 		}
			// 		if(fin < _this.endOffset){
			// 			fin =  _this.endOffset
			// 		}
			// 		_this.easeout( _this.finalOffset, fin, Math.abs(fin-_this.finalOffset/_this.timeOffset) * 5, function(value) {
			// 			_this.$emit('update:num', _this.setNum())
			// 　　　　	_this.finalOffset = value;
			// 　　　　});

			// 	}
				let differ = (_this.firstOffset - _this.finalOffset) / ( 10 * 16 + 9 * 1 + 2 * 1) ;
				differ = Math.ceil(differ);
				var final =  _this.firstOffset -  ((_this.setNum() - _this.min) * (16 + 1) + differ )
				_this.easeout( _this.finalOffset, final, 10, function(value) {
		　　　　	_this.finalOffset = value;
		　　　　});
			},
			setNum(){
				if(this.firstOffset - this.finalOffset <= 0){
					return this.min;
				}
				if(this.endOffset - this.finalOffset >= 0){
					return this.max;
				}
				let differ = (this.firstOffset - this.finalOffset) / ( 10 * 16 + 9 * 1 + 2 * 1) ;
				differ = Math.ceil(differ);
				let r_n = this.min + (this.firstOffset - this.finalOffset - differ )/( 16 + 1)
				r_n = Math.round(r_n.toFixed(2))
				return r_n
			},	
			easeout(start, end, rate, callback) {
				//缓动运动
				var timer;
				var _end = end;
				if (start == end || typeof start != 'number') {
				　　return;
				}
				end = end || 0;
				rate = rate || 2;
				clearInterval(timer)
				timer = setInterval(function(){
					start = start + (end - start) / rate;
					if (Math.abs(start - _end) < 1) {
					// 　　console.log('end');
					　　callback(end, true);
						clearInterval(timer)
					　　return;
					}
					callback(start, false);
				},15)
				// var step = function() {
				// 　　start = start + (end - start) / rate;
				// 	if (Math.abs(start - _end) < 1) {
				// 	　　console.log('end');
				// 	　　callback(end, true);
				// 	　　return;
				// 	}
				// 	callback(start, false);
				// 	requestAnimationFrame(step);
				// };
				// step();
			},
			ruleInit(){
				var _this = this;
				let differ = (_this.num - _this.min) / 10 ;
				differ = Math.ceil(differ);
				var final =  _this.firstOffset -  ((_this.num - _this.min) * (16 + 1) + differ )
		　　　　_this.finalOffset = final;
			}
		},
		watch:{

		},
		computed:{
			ruleVal(){
				return this.pushNum(this.val,this.min,this.max)
			},
			rule_number(){
				return this.num
			}			
		},
		mounted(){
			this.ruleInit()
		},
	}
</script>
<style lang="scss">
	.rule_number{
		color:#fd9827;
		font-size:24px;
	}
	.slide_rule{
		height:78px;
    	margin:20px auto;
		overflow-y:hidden;
    	border:1px solid #B0E2FF;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);   
		position:relative;
    	.slide_wrappar{
			width:auto;
			// -webkit-overflow-x-scrolling: touch;
			// overflow-x: scroll;
    		height:78px;
			overflow:hidden;
    		.rule{
				width:auto;
				height:78px;
				ul{
					display:flex;
					width:auto;
					li{
						width: 1px;
						background-color: #B0E2FF;
						height: 24px;
						margin: 0 8px;
					}
					li.integer{
						height:36px;
						width: 2px;
						background-color:#A4D3EE;
					}
				}
				ol{
					display:flex;
					margin-top:10px;
					li{
						width: 1px;
						height: 24px;
						margin: 0 8px;
					}
					li.integer{
						width: 2px;
						height:36px;
						position:relative;
						display:flex;
						justify-content:center;
						text-align:center;
						color:#DAA520;
					}
				}
			}
			.calibration{
					position:absolute;
					height:44px;
					width:2px;
				    background-color: #fd9728;
				    top:0;
				    left:50%;
				    margin-left:-1px;
				}
    	}
	}
</style>