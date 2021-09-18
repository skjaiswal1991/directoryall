import { Decimal128 } from "mongodb";
import { Document, Schema } from "mongoose";

export interface IBussinessInterface extends Document{
    title: String;
    location: String;
    category: Array<Object>;
    images: Array<Object>;
    userId:Schema.Types.ObjectId;
    profilePic:String;
    mainQuote:String;
    subQuote:String;
    coverPic:String;
    features: Array<Object>;
    covidCompliance: Array<Object>;
    productDetailsDes:String;
    venueDetailsDes:String;
    user:Object;
    lat: Decimal128;
    lng: Decimal128;
    dirSlug: String; //new added 
    city: String;
    zip: String;
    street: String;
    state: String;
    country: String;
    email: String;
    website: String;
    phoneNumber: String;
    mobile: String;
    twitter: String;
    facebook: String;
    tiktok:String;
    linkedin:String;
    instagram:String;
    googleplus: String;
    openingDays:Array<Object>;
    from: String;
    to: String;
    fulldescription: String;
    created_at:Date;
    updated_at:Date;
}