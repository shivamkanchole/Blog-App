import React from 'react'
import { PostForm as PostFormcomponent } from '../Components/index'
import {Container} from '../Components/index'

function AddPost() {
  return (
    <div>
       <Container>
         <PostFormcomponent />
       </Container>
    </div>
  )
}

export default AddPost