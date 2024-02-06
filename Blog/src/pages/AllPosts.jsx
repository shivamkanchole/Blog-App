import React, { useEffect, useState } from "react";
import { Container, Postcard } from "../Components";
import confiservice from "../appwrite/confi";

function AllPosts() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    confiservice.getposts().then((posts) => {
      if (posts) {
        setposts(posts.documents);
      }
    });
  }, []);
  return (
    <div>
      <Container>
        <div>
          {posts?.map((post) => (
            <div>
              <Postcard {...post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
