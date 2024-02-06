import React from "react";
import service  from "../appwrite/confi";
import {Link} from 'react-router-dom'

function Postcard({ $id, title, featuredimage }) { // in appwrite when we pass id , it should be with doller
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={service.getfilepreview(featuredimage)} alt={title} className='rounded-xl' />
        </div>
        <h1  className='text-xl font-bold'>{title}</h1>
      </div>
    </Link>
  );
}

export default Postcard;
