import axios from "axios";
var zomato = require('zomato');
export default class ZomatoBusinessLogic {
   private apiKey:any;
   private zomatoData:any;
   private getLocationDetails:any;
   constructor(){
    this.apiKey = "d96abe67e43bd86d5180459c4d81ec53";
    this.zomatoData = zomato.createClient({
      userKey: 'd96abe67e43bd86d5180459c4d81ec53', //as obtained from [Zomato API](https://developers.zomato.com/apis)
    });
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
   public getRestorantListOnCords = (lat,lng,query) =>{
    return new Promise((resolve,reject)=>{
      console.log(`here promis for retrurning data`)
            console.log(`search?lat=${lat}&lon=${lng}&q=${query}`);
            this.getLocationDetails.get(`search?lat=${lat}&lon=${lng}&q=${query}`).then((data)=>{
              resolve(data)
            }).catch((error)=>{  
                  reject(error)
            });          
    })
 } 

  public filterData = (ApiData,BussinessData) =>{
      return new Promise((resolve,reject)=>{
          try{

          
           const sortedRes = ApiData.restaurants.filter(({restaurant})=>{
                let url  = restaurant.url.split( '?')[0];
                return url === BussinessData ? true : false;
            })

            resolve(sortedRes[0])
          }
          catch{
            resolve("Error");
            
          }
        
            
        })
 }

  public getReviewData  = (resturent) =>{
    console.log(resturent)
    return new Promise((resolve,reject)=>{
      console.log(`here promis for retrurning data`)
      console.log({
        res_id:resturent.restaurant.id, // id of restaurant whose details are requested
        start : "0" , //fetch results after this offset (Integer)
        count: "5" , //max number of results to retrieve
        
        })
            this.zomatoData.getRestaurant({
              res_id:resturent.restaurant.id // id of restaurant whose details are requested
             // start : "0" , //fetch results after this offset (Integer)
             // count: "5" , //max number of results to retrieve
              
              }, function(err, result){
                  if(!err){
                    resolve(JSON.parse(result));
                  }else {
                    reject(err);
                  }
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