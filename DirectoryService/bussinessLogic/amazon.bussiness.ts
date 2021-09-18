
const unirest = require("unirest");

export default class AmazonBusinessLogic {

     public req: any;
     public client: any;

     constructor() {

          this.client = unirest("GET", "https://amazon23.p.rapidapi.com/product-details");
     }

     getAllReviewAndRating = (id) => {

          this.client.query({
               "asin": `${id}`
          });

          this.client.headers({
               "x-rapidapi-key": "50379b22a4mshffadaa146952efdp1bda36jsn62d634d1d9b8",
               "x-rapidapi-host": "amazon23.p.rapidapi.com",
               "useQueryString": true
          });


          return new Promise((resolve, reject) => {

               try {
                    this.client.end(function (res) {
                         if (res.error) reject(res.error);

                         resolve(res.body);
                    });

               }
               catch (error) {
                    reject(error);
               }


          })

          //return true

     }

}