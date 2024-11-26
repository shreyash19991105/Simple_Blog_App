import { Post } from "../model/post.js";

export const getAllPosts = async (request, response) => {
  try {
    let query = await Post.find();
    return response.status(200).json({ data: query });
  } catch (error) {
    console.log("error in getAllPosts", error);
  }
};

export const createPost = async (request, response) => {
  const { title, content, author } = request.body;
  console.log(request);
  try {
    const newPost = await Post.create({
      title: title,
      content: content,
      author: author,
      date: new Date(),
    });
    return response.status(200).json({
      success: true,
      message: "added post successfully",
      data: newPost,
    });
  } catch (error) {
    console.log("error in createPost", error);
  }
};

export const updatePost = async (request, response) => {
  try {
    const { id } = request.params;
    const { title, author, content } = request.body;
    const post = await Post.findOne({ _id: id });
    post.title = title;
    post.author = author;
    post.content = content;
    await post.save();
    return response.status(200).json({ success: true, data: post });
  } catch (error) {
    console.log("error in updatePost", error);
  }
};

export const deletePost = async (request, response) => {
  try {
    const { id } = request.params;
    const post = await Post.findOne({ _id: id });
    await post.deleteOne();

    return response
      .status(200)
      .json({ success: true, message: "post deleted successfully" });
  } catch (error) {
    console.log("error in deletePost", error);
  }
};
