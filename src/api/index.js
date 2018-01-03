import axios from "axios"
axios.defaults.timeout = 5000; // 默认5s超时
axios.defaults.baseURL = 'http://testapi.awbchina.com/v1/';
//axios.defaults.withCredentials=true;// 请求带上cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
     // 判断请求的类型
     // 如果是post请求就把默认参数拼到data里面
     // 如果是get请求就拼到params里面
    if(config.method === 'post') {
        let data = qs.parse(config.data)
        config.data = qs.stringify({
            token: token,
            ...data
        })
    } else if(config.method === 'get') {
        config.params = {
            token: token,
            ...config.params
        }
    }
    return config;
}, function (error) {
return Promise.reject(error);
})
export default {
	index_rec() {
		// 首页个人推荐内容：歌单，新歌，mv，电台
		let banner = axios("banner");
		let pl = axios('personalized');
		let ns = axios('personalized/newsong');
		let mv = axios('personalized/mv');
		let djprogram = axios('personalized/djprogram');
		return axios.all([banner, pl, ns, mv, djprogram]).then(axios.spread(function(a, b, c, d, e) {
			return Promise.resolve([a.data.banners, b.data.result, c.data.result, d.data.result, e.data.result])
		}))
	},
	hra_data(alter_id){
		return axios("survey_answer/get", {
			params: {
				id: alter_id
			}
		});
	},
	hra_last(uid){
		return axios("survey_answer/get_last", {
			params: {
				uid: uid
			}
		});
	},
	get_plan(uid){
		return axios("plan/get", {
			params: {
				user_id: uid
			}
		});
	},
	plan_mode(cid,uid,type_id){
		return axios("mode/list", {
			params: {
				company_id: cid,
				user_id:uid,
				type_id:type_id
			}
		});
	},
	company_info(cid){
		return axios("company/get", {
			params: {
				id: cid
			}
		});
	}
}