import { rejects } from "assert";
import axios from "axios";
import { resolve } from "path";
import {client} from 'yelp-fusion';
import { CategoryRepository } from "../repository/category.repository";
import { ICategory } from "./interfaces/category.interface";
import { ICategoryInterface } from "../models/Interfaces/category.interface";

export default class YelpBusinessLogic {

     public apiKey:any;
     public client:any;
     constructor(){
               this.apiKey = 'MoQGQ1JOOsmMldzVaWhaBHOZjEHJEp6_vB30quL3KkQflLyzCL048KTJ3CA4TzzrFOigc0C-j4mzaXO3GulWHjRxWgtvqlIaTrIoUF0uEU4piszGDdZsAvswdZQhX3Yx'
               this.client = client(this.apiKey);
               console.log(this.client);
     }

     public getAllReviewAndRating = (params) =>{


               return  new Promise((resolve,reject)=>{
                    try {
                               this.client.search({...params}).then(response => {
                                   const firstResult = response.jsonBody.businesses[0];
                                   resolve(firstResult);
                              }).catch((error) => {
                                   reject(error);
                              });

                    }
                    catch (error) {
                         reject(error);
                    }
          })

     }
   
     public getAllAutoSearch = (params) =>{

          return  new Promise((resolve,reject)=>{
               try {
                    this.client.autocomplete({...params}).then(response => {
                         const firstResult = response.jsonBody.businesses[0];
                         resolve(firstResult);
                    }).catch(error => {
                         //console.log(error)
                         reject(error);
                    });
               }
               catch (error) {
                    reject(error);
               }

          })
     }
     public getAllReview = (buisnessID) => {

          return new Promise((resolve, reject) => {
               try {
                    this.client.reviews(buisnessID).then(response => {
                         // const firstResult = response.jsonBody.businesses[0];
                         resolve(response);
                    }).catch(error => {
                         //console.log(error)
                         reject(error);
                    });
               }
               catch (error) {
                    reject(error);
               }

          })
     }

     


}