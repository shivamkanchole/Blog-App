import { conf } from "../conf/conf";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;//same as a storage but hear insteed of storage we use bucket as a tarminology for storage

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid)

    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({title,slug, content, featuredimage, status, userid}){
    try {
        return await this.databases.createDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug,
            {
                title,
                content,
                featuredimage,
                status,
                userid
            }
        )
    } catch (error) {
        console.log("Error in Appwrite createpost",error);
    }
  }

  async updatePost(slug,{title,content,featuredimage,status}){
    try {
        return await this.databases.updateDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug,
            {
                title,
                content,
                featuredimage,
                status
            }
        )
    } catch (error) {
        console.log("Error in Appwrite updatepost",error);
    }
  }

  async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug,
        )
        return true
    } catch (error) {
        console.log("Error in Appwrite deletePost",error);
        return false
    }
  }

  async getpost(slug){
     try {
        return await this.databases.getDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug,
        )
     } catch (error) {
        console.log("Error in Appwrite getpost",error);
        return false
     }
  }

  async getposts(){
    try {
        return await this.databases.listDocuments(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            [
                Query.equal("status","active")
            ]
        )
    } catch (error) {
        console.log("Error in Appwrite getpost",error);
    }
  }

  // now services or methods of uploading file

  async uploadfile(file){
     try {
        return await this.bucket.createFile(
            conf.appwritebucketid,
            ID.unique(),
            file
        )// it returns FILEID
     } catch (error) {
        console.log("Error in Appwrite uploadfile",error);
        return false
     }
  }

  async deletefile(fileid){  // basically file id is coming from updatefile, it returns fileid...
     try {
        await this.bucket.deleteFile(
            conf.appwritebucketid,
            fileid
        )
        return true
     } catch (error) {
        console.log("Error in Appwrite deletefile",error);
        return false
     }
  }

  getfilepreview(fileId){  // basically it will return , url of an image
        return this.bucket.getFilePreview(
            conf.appwritebucketid,
            fileId
        )
    
  }
}

const confiservice = new Service();
export default confiservice;
