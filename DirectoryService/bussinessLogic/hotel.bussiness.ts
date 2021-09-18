
const unirest = require("unirest");

export default class HotelBusinessLogic {

     public req: any;
     public client: any;

     getAllReviewAndRating = (id) => {


          this.req = unirest("GET", `https://hotels-com-free.p.rapidapi.com/pde/property-details/v1/hotels.com/${id}`);
          this.req.headers({
               "x-rapidapi-key": "50379b22a4mshffadaa146952efdp1bda36jsn62d634d1d9b8",
               "x-rapidapi-host": "hotels-com-free.p.rapidapi.com",
               "useQueryString": true
          });
          this.req.query({
               "rooms": "1",
               "checkIn": "2021-01-27",
               "checkOut": "2021-01-28",
               "locale": "en_US",

          });

          return new Promise((resolve, reject) => {

               try {
                    this.req.end(function (res) {
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