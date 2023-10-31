import Heroes from "../models/Heroes"
import mongoose from "mongoose"
const { ObjectId } = mongoose.Types;

const heroSkinsController = {
    findAsPublic: async (req, res) => {
        try {
            const { id } = req.params
            const { search } = req.query
            const queryRegx = new RegExp(search, 'i');
            const selector = {}

            if (id) {
                selector._id = new ObjectId(id)
            } else {
                selector.$or = [{
                    code: { $regex: queryRegx }
                },
                {
                    name: {
                        $regex: queryRegx
                    }
                },]
            }
            const heroes = await Heroes.find(selector, { _id: 1, code: 1, name: 1, skins: 1 }).collation({ locale: "en_US", numericOrdering: true }).sort({ code: 1 })
            return res.status(200).json(heroes);
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    }
}

export default heroSkinsController