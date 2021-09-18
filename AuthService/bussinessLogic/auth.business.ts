import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { IUserInterface } from "../models/Interfaces/user.interface";
import { UserBussiness } from "./user.bussiness";
import * as multer from "multer";
const uuidv4 = require("uuid-v4");
import * as path from "path";

interface UserResults {
  isActive: Boolean;
  tokens: Array<String>;
  user_details: IUserInterface;
  expiresIn: String;
}
export class AuthBussiness  {
 
  public handleLogin = (user: IUserInterface) => {
    console.log("Hadeling login .........................................",user.email,user.password);
    const userBussiness = new UserBussiness();
    return new Promise((resolve, reject) => {
          
         userBussiness.findWithAnd((err,results)=>{
           console.log(results);
           console.log('Results');
               if(err){
                 reject(err)
               }
               resolve(results);
          },[{email:user.email},{password:user.password}])
    });
  };

  public handleSingup = async (user: IUserInterface) => {
    console.log("Hadeling signup .........................................");
    const userBussiness = new UserBussiness();

    this._checkExist(user.email).then((res) => {

      if (!res) {
        return new Promise((resolve, reject) => {
          userBussiness.create(user, (err, results) => {
            if (err) {
              reject(err)
            }
            resolve(results);
          })

        });
      } else {
        return false;
      }


    })

  };

  public editUser = async (email: any) => {
    console.log("Hadeling signup .........................................");
    const user = new UserBussiness();

    const queryObject = { email: email };
    return new Promise((resolve, reject) => {
      user.find(
        (err, result: Array<IUserInterface>) => {
          if (err) {
            reject(err);
          }
          console.log('result');
          console.log(result);
          if (result.length == 1) {
            console.log('I am here___');
            resolve(result);
          } else if (result.length > 1) {
            reject("multiple_account_found");
          } else {
            reject(err);
          }
        },
        queryObject,
        true
      );
    });

  };

  private _checkExist = async (email: String) => {
    const user = new UserBussiness();
    const queryObject = { email: email };
    console.log("checking for existance of account here.....");
    return new Promise((resolve, reject) => {
      user.find(
        (err, result: Array<IUserInterface>) => {
          if (err) {
            reject(err);
          }
          console.log('result');
          console.log(result);
          if (result.length == 1) {
            resolve(true);
          } else if (result.length > 1) {
            reject("multiple_account_found");
          } else {
            resolve(false);
          }
        },
        queryObject,
        true
      );
    });
  };

  public createTokens = async (user:any) => {

    console.log(_.pick(user[0], ["_id"]))

    const createToken = jwt.sign(
      {
        
        user: _.pick(user[0], ["_id"]),
       // role: user[0].role.role_name,
      },
      process.env.SESSION_SECRATE,
      {
        expiresIn: "7d",
      }
    );
    const createReffreshToken = jwt.sign(
      {
        user: _.pick(user[0], ["_id"]),
      },
      process.env.SESSION_SECRATE,
      {
        expiresIn: "7d",
      }
    );
    console.log(createToken,createReffreshToken);

    return Promise.all([createToken, createReffreshToken]);
  };

  public storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, "./public");
    },
    filename: (req, file, cb) => {
      /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });

  public uploadMular = () => {
    const storage = this.storage;
    return multer({ storage });
  };
}
