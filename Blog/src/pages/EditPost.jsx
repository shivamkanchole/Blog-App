import React from 'react'
import confiservice from '../appwrite/confi'
import { useState, useEffect } from 'react'
import {PostForm, Container} from '../Components'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [post, setpost]  = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    useEffect(()=>{
      confiservice.getpost(slug).then((post)=>{
        if(post)
        {
            setpost(post)
        }
        else{
            navigate('/')
        }
      })
    },[slug, navigate])

  return post ? 
  <div>
    <Container>
      <PostForm post = {post}/>
    </Container>
  </div>
  :null
}

export default EditPost