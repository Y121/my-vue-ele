import axios from './request';
//获取城市信息
export const cityGuess = (params)=>{
    return axios.get('/api/v1/cities',{params});//get请求
}























