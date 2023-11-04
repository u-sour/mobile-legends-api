import Heroes from "../models/Heroes"
import mongoose from "mongoose"
const { ObjectId } = mongoose.Types;

const heroSkinsController = {
    findAsPublic: async (req, res) => {
        try {
            const selector = {}
            const { id } = req.params
            let { search, page, limit } = req.query
            const queryRegx = new RegExp(search, 'i');
            page = parseInt(page)
            limit = parseInt(limit)

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
            let serverTotalHeroesLength = await Heroes.find().count()
            const heroes = await Heroes.find(selector, { _id: 1, code: 1, name: 1, skins: 1 }).sort({ code: 1 }).collation({ locale: "en_US", numericOrdering: true }).skip((page - 1) * limit).limit(limit)
            if (search) serverTotalHeroesLength = heroes.length
            const data = { heroes, serverTotalHeroesLength }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    }
}

export default heroSkinsController