import { mongooseInstance, mongooseConnection } from "../db/db";
import { IUserInterface } from "../../models/Interfaces/user.interface";

const UserSchema = new mongooseInstance.Schema({
  fullName: {
    required: [true, "Please enter your full name"],
    type: String,
    maxlength: 225,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  profilePic: {
    type: String,
  },
  docs: {
    type: Array,
  },
  incomeType: {
    type: String,
  },
  // role: {
  //   type: mongooseInstance.Schema.Types.ObjectId,
  //   required: "{PATH} is required",
  //   ref: "roles",
  // },
  address: [
    {
      street: { type: String, maxlength: 225, required: true },
      city: { type: String, maxlength: 225, required: true },
      state: { type: String, maxlength: 225, required: true },
      zip: { type: Number, max: 5, required: true },
    },
  ],
  isActive: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
  },
}).pre<IUserInterface>("save", function(next) {
  if (this.isNew) {
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

const schemaModel = mongooseConnection.model<IUserInterface>(
  "users",
  UserSchema
);
export default schemaModel;
