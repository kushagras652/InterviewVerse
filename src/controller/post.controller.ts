import { Request, Response } from "express";
import { Post } from "../mongodb/model";

interface ReqQuery {
  topic?: string; // Assuming 'topic' is a string in req.query
}
export const getAll = async (req: Request, res: Response) => {
  const { topic } = req.query as ReqQuery;
  const queryObject: Record<string, any> = {}; //* wierd ts stuf :))
  
  if (topic) {
    queryObject.topic = { $regex: topic, $options: "i" };
  }
  try {
    // const getAllPost = await Post.find(queryObject);
    const getAllPost = await Post.find(queryObject).populate('authRef','username')
    res.status(200).json({ msg: "All posts read", getAllPost });
  } catch (error) {
    res.status(500).json({ msg: "Error is coming", error });
  }
};

export const searchUserPosts = async(req:Request,res:Response)=>{
  try {
    
  } catch (error) {
    
  }
}

export const getLoggedInUserPosts = async(req : Request,res : Response) =>{
  try {
    const {id} = req.params
    // console.log(id);
    // const response = await Post.findOne({authRef : id})
    const response = await Post.find({authRef : id}).populate({
     path : 'authRef',
     model : 'Auth',
     select : 'username'
    }).exec()
    res.status(200).json(response)
  } catch (error) {
        
  }
}

export const create = async (req: Request, res: Response) => {
  const { desc, tags, details, topic,authRef } = req.body;
  
  // console.log(desc,tags,details,topic);
  // console.log(tags);
  const newPost = new Post({
    desc: desc,
    tags: tags,
    details: details,
    topic: topic,
    authRef : authRef
  })

  try {
    const res2 = await newPost.save();
    // console.log(res2);
    res.status(201).send("Post created");
  } catch (error) {
    res.status(500).json({ msg: "Error is coming", error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    await Post.findByIdAndDelete(_id);
    res.status(200).json({ msg: "Post deleted" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id);
  const {desc,tags,details,topic} = req.body
  const response = await Post.updateOne({ authRef : id }, {desc : desc,tags : tags,details : details,topic : topic});
  // console.log(response);
  res.status(200).json({ msg: "Updated Successfully", response });
};

export const getSingle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('authRef','username');
    res.status(200).json({ msg: "Single Post", post });
  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};
