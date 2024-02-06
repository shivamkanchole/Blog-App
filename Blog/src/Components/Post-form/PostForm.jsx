import React,{useEffect, useCallback} from "react";
import confiservice from "../../appwrite/confi.js";
import { useForm } from "react-hook-form";
import {Input, RTE, Select, Button } from "../index.js";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const PostForm = ({ post }) =>{
  const navigate = useNavigate();
  const { handleSubmit, register, control, watch, getValues, setValue } = useForm({
    defaultValues: {
      title: post ? post.title : "",
      slug: post ? post.slug : "",
      content: post ? post.content : "",
      status: post ? post.status : "active",
    },
  });
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      // basicaly if we have a post that means that we are updating the existing post
      const file = await (data.image[0])
        ? confiservice.uploadfile(data.image[0])
        : null; // it is possible na ki user want to change the picutre , so now we have post but we want ki picture change ho jaye, so we have uploaded that new picture of data in into our backend storage

      // now we want to delete that previous image also , in that way
      if (file) {
        const check =  await confiservice.deletefile(post.featuredimage);
        console.log(check);
      }

      // we have delete the image from post  now we want to inject new image , which is pased in data
      const dbPost = await confiservice.updatePost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } 
    else {
      // now else is when we want to add new post ..
      const file = await confiservice.uploadfile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredimage = fileId;

        const dbPost = await confiservice.createPost({
          ...data,
          userid:userData.$id
        });
        
        if(dbPost)
        {
            navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-"); // are called as regex formate (this regex is written by CHATGPT)

    return "";
}, []);

useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    });

    return () => subscription.unsubscribe(); // this is for optimization , like to avoid the infite calls of itself
}, [watch, slugTransform, setValue]); // depedencies

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    onInput={(e) => { // the onInput event occurs immediately after the content has been changed, while onChange occurs when the element loses focus.
                      setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    {...register("slug", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :" // featured image means post thumbnails
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={confiservice.getfilepreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

// export default PostForm;
