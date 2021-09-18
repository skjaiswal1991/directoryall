import axios from "axios";
//import zomato from 'zomato';
//import zomato from 'zomato';
var zomato = require('zomato')
export default class ZomatoBusinessLogic {
   private apiKey:any;
   private getLocationDetails:any;
   private zomatoData:any;
   constructor(){
    this.zomatoData = zomato.createClient({
     userKey: 'd96abe67e43bd86d5180459c4d81ec53', //as obtained from [Zomato API](https://developers.zomato.com/apis)
   });
    
    //zomato({ userKey: 'd96abe67e43bd86d5180459c4d81ec53'});
    
     //     this.getLocationDetails = axios.create({
     //         baseURL: "https://developers.zomato.com/api/v2.1/",
     //       });

     //     // this.getLocationDetails.CancelToken = axios.CancelToken;
     //     // this.getLocationDetails.isCancel = axios.isCancel;
     //     // //const source = axios.CancelToken.source();
     //     this.getLocationDetails.defaults.headers.post["Content-Type"] = "application/json"; // for POST
     //     this.getLocationDetails.defaults.headers.patch["Content-Type"] =  "application/json";
     //     this.getLocationDetails.defaults.headers.patch["Access-Control-Allow-Origin"] = "*";
     //     this.getLocationDetails.interceptors.request.use(function (config) {
     //           config.headers['user-key'] = "d96abe67e43bd86d5180459c4d81ec53";
     //           return config;   
     //         });
   }

   public getAllRestorantsOnCords = (lat,lng,from,to) =>{
      //return new Promise((resolve,reject)=>{
        console.log(`here promis for retrurning data`)
          //    this.getLocationDetails.get(`search?lat=${lat}&lon=${lng}`).then((data)=>{
          //         resolve(data)
          //    }).catch((error)=>{  
          //         reject(error)
          //    });
            //  this.zomatoData.getGeocode({lat: lat, lon: lng})
            //    .then(res => console.log(res))
            //    .catch(err => console.log(err));
                   // })

                   this.zomatoData.getCities({q: 'vancouver'})
                   .then(res => console.log(res))
                   .catch(err => console.log(err)); 
   } 

   public getRestorantListOnCords = (lat,lng) =>{
   return new Promise((resolve,reject)=>{
      console.log(`here promis for retrurning data`)
          // this.zomatoData.getGeocode({lat: lat, lon: lng})
          // .then(res => console.log(res))
          // .catch(err => console.log(err));

      //     this.zomatoData.getRestaurant({
      //       res_id:"9186"
      //       //max number of results to retrieve
      //  }, function(err, result){
      //       if(!err){
      //         resolve(result);
      //       }else {
      //         reject(err);
      //       }
      //   });

         this.zomatoData.getCuisines({
              q:"https://www.zomato.com/ncr/vapour-bar-exchange-sohna-road-gurgaon",
             // city_id:"1", // suggestion for location name
              lat:"28.613939", //latitude
              lon:"77.209021", //longitude
              city_ids:"1",
             // count:"2" 
              //count:"100"
             //  }
         }, function(err, result){
              if(!err){
                resolve(result);
              }else {
                reject(err);
              }
          });

      //     this.zomatoData.getLocations({
      //      // query:"New Delhi", // suggestion for location name
      //       lat:"28.613939", //latitude
      //       lon:"77.209021", //longitude
      //       count:"100"
      //      //  }
      //  }, function(err, result){
      //       if(!err){
      //         resolve(result);
      //       }else {
      //         reject(err);
      //       }
      //   });
          // this.zomatoData.getGeocode({
          //      lat:lat, //latitude
          //      lon:lng //longitude
          //      }, function(err, result){
          //          if(!err){
          //           resolve(result);
          //          }else {
          //           reject(err);
          //          }
          //      });
    })
 } 

   public proccessData = (ApiData,BussinessData) =>{
    console.log(BussinessData)
    console.log(ApiData.nearby_restaurants);
//     const sortedRes = ApiData.nearby_restaurants.filter(({restaurant})=>{
//      return  restaurant.name.toLowerCase() === BussinessData.title.toLowerCase() ? true:false
//     })
   //console.log(sortedRes[0])
   // return sortedRes[0]
   }
}