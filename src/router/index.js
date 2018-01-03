import Vue from 'vue'
import Router from 'vue-router';

const Plan = r => require.ensure([], () => r(require('@/page/plan')), 'plan')
const Hra = r => require.ensure([], () => r(require('@/page/hra/hra')), 'hra')
import Default from '@/page/default'
Vue.use(Router)
export default new Router({
  	routes: [
	    {
	      	path: '/',
	      	name: 'default',
	      	component: Default
	    },
	     {
	      	path: '/plan',
	      	name: 'plan',
	      	component: Plan,
	      	meta:{
	      		requireAuth:true
	      	}
	    },
	    {
	      	path: '/hra',
	      	name: 'hra',
	      	component: Hra,
	      	meta:{
	      		requireAuth:true
	      	}
	    }
  	]
})
