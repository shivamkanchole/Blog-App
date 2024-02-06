import { conf } from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account; // we are making account inside a constructor because it is more optimised way , we are basically creating an account when ever a object is created , otherwise we are just wasting our resoursec , means there is not use of that account without a object...right?
  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);
    
      // console.log(Client.setEndpoint)
    this.account = new Account(this.client);
  }

  async createAccount({email,password,name})
  {
    try {
        const useraccount = await this.account.create(ID.unique(),email,password,name)
        if(useraccount)
        {
           // hear we can do some stuff like we can directly make login to the user because account is created or else whatever we need to do 
           return this.loginuser({email,password});
        }
        else{
            return useraccount;
        }
        
    } catch (error) {
        console.log("Error in Appwrite CreateAccount",error);
    }
  }

  async loginuser({email,password})
  {
    try {
      return await this.account.createEmailSession(email,password);
    } catch (error) {
      console.log("appwrite error in login" , error);
    }
  }

  async Logoutuser()
  {
    try {
        await this.account.deleteSessions()
    } catch (error) {
        console.log("appwrite error in logoutuser" , error);
    }
  }

  // now basically we are checking that when we are is at home that user is existing or not basically it is login or not, for this Account has some methods like get()
  async getCurrentUser()
  {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("appwrite error in getcurrentuser ->" , error);
    }

    return null;
  }
}

const authService = new Authservice(); // this is a object of class authservice

export default authService; // we just export that object
