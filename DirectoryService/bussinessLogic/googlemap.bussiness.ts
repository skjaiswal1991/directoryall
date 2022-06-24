import { rejects } from "assert";
import axios from "axios";
import { resolve } from "path";
import { CategoryRepository } from "../repository/category.repository";
import { ICategory } from "./interfaces/category.interface";
import { ICategoryInterface } from "../models/Interfaces/category.interface";

export default class GooglemapBusinessLogic {

     public apiKey: any;
     public client: any;
     public getLocationDetails: any;
     constructor() {
          this.apiKey = 'AIzaSyCBQ-xncJH7hbgYe4crvHoJ89KnFxvxDwY'

          this.getLocationDetails = axios.create({
               baseURL: "https://maps.googleapis.com/maps/api/place/textsearch/",
          });
          // this.getLocationDetails.defaults.headers.post["Content-Type"] = "application/json"; // for POST
          // this.getLocationDetails.defaults.headers.patch["Content-Type"] = "application/json";
          // this.getLocationDetails.defaults.headers.patch["Access-Control-Allow-Origin"] = "*";
          // this.getLocationDetails.interceptors.request.use(function (config) {
          //      config.headers['user-key'] = "d96abe67e43bd86d5180459c4d81ec53";
          //      return config;
          // });
     }

     public getAllReviewAndRatingGoogleMap = (params, businessName) => {
          console.log('getAllReviewAndRatingGoogleMap here .....')
          return new Promise((resolve, reject) => {
               // .
               // axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=Biaggio+Cafe&location=151.1959076557941,-33.86679741871786&radius=10000&key=AIzaSyDNEtXw16U-UOAeFKeuHYu3xmH_qQ1gwkU')
               //      .then((res) => {
               //           console.log(res.data);
               //      })

               // getLocationDetails
               console.log(`json?query=${businessName}&location=${params.latitude},${params.longitude}&radius=10000&key=${this.apiKey}`)
               let bName = businessName.replace("+", " ")

               this.getLocationDetails.get(`json?query=${businessName}&location=${params.latitude},${params.longitude}&radius=10000&key=${this.apiKey}`)
                    .then((response) => {

                         console.log('response')
                         console.log(response)
                         let getData = response.data.results.filter((bus) =>
                              bus.name == bName
                         )
                         resolve(getData)
                    }).catch((error) => {
                         reject(error)
                    });
               // this.client.search({...params}).then(response => {
               //      const firstResult = response.jsonBody.businesses[0];
               //      resolve(firstResult);
               // }).catch((error) => {
               //      reject(error);
               // });

          })

     }

     // public getAllAutoSearch = (params) => {

     //      return new Promise((resolve, reject) => {
     //           this.client.autocomplete({ ...params }).then(response => {
     //                const firstResult = response.jsonBody.businesses[0];
     //                resolve(firstResult);
     //           }).catch(error => {
     //                //console.log(error)
     //                reject(error);
     //           });

     //      })
     // }
     // public getAllReview = (buisnessID) => {

     //      return new Promise((resolve, reject) => {
     //           this.client.reviews(buisnessID).then(response => {
     //                // const firstResult = response.jsonBody.businesses[0];
     //                resolve(response);
     //           }).catch(error => {
     //                //console.log(error)
     //                reject(error);
     //           });

     //      })
     // }




}