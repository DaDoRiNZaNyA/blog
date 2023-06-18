import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
}

export const getOne = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const doc = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $inc: { viewsCount: 1 } },
        { new: true }
      ).exec();
  
      if (!doc) {
        return res.status(404).json({
          message: 'Статья не найдена',
        });
      }
  
      res.json(doc);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось получить статьи',
      });
    }
  };

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
    
        const deletedPost = await PostModel.findOneAndDelete({ _id: postId }).exec();
    
        if (!deletedPost) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }
    
        res.json(deletedPost);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось удалить статью',
        });
      }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        const updateData = {
          title: req.body.title,
          text: req.body.text,
          imageUrl: req.body.imageUrl,
          tags: req.body.tags,
          user: req.userId,
        };
    
        const updatedPost = await PostModel.updateOne({ _id: postId }, updateData).exec();
    
        if (updatedPost.n === 0) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }
    
        res.json(updatedPost);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось обновить статью',
        });
      }
  }