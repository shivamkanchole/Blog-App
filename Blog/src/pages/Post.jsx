import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import confiservice from "../appwrite/confi";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [Auther, setAuther] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // let isAuthor = (post && (userData ? post.userid === userData.$id : false));

  useEffect(() => {
    if (slug) {
      confiservice.getpost(slug).then((post) => {
        if (post){
          setPost(post);
          setAuther(post && (userData ? post.userid === userData.$id : false));
        }
        else navigate("/");
      });
    } else navigate("/");
  }, [slug,navigate]);

  const deletePost = () => {
    confiservice.deletePost(post.$id).then((status) => {
      if (status) {
        confiservice.deletefile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={confiservice.getfilepreview(post.featuredimage)}
            alt={post.title}
            className="rounded-xl"
          />
          {Auther && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;

  // In a RTE the
  //  containt is stored in the form of Plain HTML, thats why we parsed it
}
