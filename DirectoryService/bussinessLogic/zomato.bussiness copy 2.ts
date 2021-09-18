import axios from "axios";
export default class ZomatoBusinessLogic {
   private apiKey:any;
   private getLocationDetails:any;
   constructor(){
    this.apiKey = "d96abe67e43bd86d5180459c4d81ec53";
    
    this.getLocationDetails = axios.create({
        baseURL: "https://developers.zomato.com/api/v2.1/",
      });
    // this.getLocationDetails.CancelToken = axios.CancelToken;
    // this.getLocationDetails.isCancel = axios.isCancel;
    // //const source = axios.CancelToken.source();
    this.getLocationDetails.defaults.headers.post["Content-Type"] = "application/json"; // for POST
    this.getLocationDetails.defaults.headers.patch["Content-Type"] =  "application/json";
    this.getLocationDetails.defaults.headers.patch["Access-Control-Allow-Origin"] = "*";
    this.getLocationDetails.interceptors.request.use(function (config) {
          config.headers['user-key'] = "d96abe67e43bd86d5180459c4d81ec53";
          return config;   
        });
   }

   public getAllRestorantsOnCords = (lat,lng,from,to) =>{
      return new Promise((resolve,reject)=>{
        console.log(`here promis for retrurning data`)
             this.getLocationDetails.get(`search?lat=${lat}&lon=${lng}`).then((data)=>{
                  resolve(data)
             }).catch((error)=>{  
                  reject(error)
             });
      })
   } 

   public getRestorantListOnCords = (lat,lng) =>{
    return new Promise((resolve,reject)=>{
      console.log(`here promis for retrurning data`)
           this.getLocationDetails.get(`geocode?lat=${lat}&lon=${lng}`).then((data)=>{
                resolve(data)
           }).catch((error)=>{  
                reject(error)
           });
    })
 } 

   public proccessData = (ApiData,BussinessData) =>{
    //console.log(BussinessData,ApiData.nearby_restaurants);
    const sortedRes = ApiData.nearby_restaurants.filter(({restaurant})=>{
     return  restaurant.name.toLowerCase() === BussinessData.title.toLowerCase() ? true:false
    })
   //console.log(sortedRes[0])
    return sortedRes[0]
   }
}