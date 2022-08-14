import PostModel from "../models/Post.js";



export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().exec();

        res.json(posts)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить героев',
        })
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate(
            {
                _id: postId,

            },
            {
                $inc: {viewsCount: 1}
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не удалось вернуть героя',
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: "Герой не найден"
                    });
                }
                res.json(doc);
            }
        );

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить героя',
        })
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({
                _id: postId,
            }, (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'Не удалось удалить героя'
                    });
                }
                if (!doc) {
                    console.log(err)
                    return res.status(404).json({
                        message: 'Герой не найдена',
                    });
                }
                res.json({
                    success: true
                });
            },
        );
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить героя',
        })
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            nickname: req.body.nickname,
            real_name: req.body.real_name,
            imageUrl: req.body.imageUrl,
            origin_description: req.body.origin_description,
            superpowers: req.body.superpowers,
            catch_phrase: req.body.catch_phrase,
        })

        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать героя',
        })
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
                _id: postId
            },
            {
                nickname: req.body.nickname,
                real_name: req.body.real_name,
                imageUrl: req.body.imageUrl,
                origin_description: req.body.origin_description,
                superpowers: req.body.superpowers,
                catch_phrase: req.body.catch_phrase,
            }
        );

        res.json({
            success:true
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить героя',
        })
    }
}