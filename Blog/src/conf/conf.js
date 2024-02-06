// this file is basically used to export the envirment varriable , so that we can surely say there typeof(string,boolen...) , otherwie it may take loat time in loading and also it causes crash of our application

// export const conf = () =>{
//     appwriteurl = String(import.meta.env.VITE_APPWRITE_URL) // basically this is nothing but a SETENDPINT
//     appwriteprojectid = String(import.meta.env.VITE_APPWRITE_PROJECT_ID )
//     appwritedatabaseid = String(import.meta.env.VITE_APPWRITE_DATABASE_ID)
//     appwritecollectionid = String(import.meta.env.VITE_APPWRITE_COLLECTION_ID)
//     appwritebucketid = String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
// } this is a wrong way to declare this 

export const conf  = {
    appwriteurl : String(import.meta.env.VITE_APPWRITE_URL), // basically this is nothing but a SETENDPINT
    appwriteprojectid : String(import.meta.env.VITE_APPWRITE_PROJECT_ID ),
    appwritedatabaseid : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritecollectionid : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwritebucketid : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}