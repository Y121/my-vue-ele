import axios from './request';
//获取城市信息
export const cityGuess = (params)=>{
    return axios.get('/api/v1/cities',{params});//get请求
}
//获取所选城市信息
export const currentCity = (id)=>{
    return axios.get('/api/v1/cities/' + id);
}
//搜索地址
export const searchAddress = (city_id, keyword) => {
    return axios.get('/api/v1/pois',{
        params:{
            city_id,
            keyword,
            type:'search'
        }
    })
}





















