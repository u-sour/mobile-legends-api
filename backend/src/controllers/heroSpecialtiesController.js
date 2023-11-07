import HeroSpecialties from "../models/HeroSpecialties"
import AlertMessage from "../utils/alert-message"
import mongoose from "mongoose"
const { ObjectId } = mongoose.Types;

const heroSpecialtiesController = {
    findOne: async (req, res) => {
        try {
            const _id = req.params.id
            const heroSpecial = await HeroSpecialties.findById(_id)
            return res.status(200).json(heroSpecial);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    find: async (req, res) => {
        try {
            let selector = JSON.parse(req.query.selector)
            const heroSpecialties = await HeroSpecialties.find(selector)
            return res.status(200).json(heroSpecialties);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    findAsPublic: async (req, res) => {
        try {
            const selector = {}
            if (req.params.id) selector['_id'] = new ObjectId(req.params.id)
            const heroSpecialties = await HeroSpecialties.find(selector, { __v: 0, created_at: 0, updated_at: 0 })
            return res.status(200).json(heroSpecialties);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    create: async (req, res) => {
        try {
            const data = req.body;
            await HeroSpecialties.create(data)
            return res.sendStatus(201);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    edit: async (req, res) => {
        try {
            const _id = req.params.id
            const heroSpecialty = await HeroSpecialties.findById(_id)
            if (!heroSpecialty) return res.status(400).json({ message: AlertMessage.documentNotFound })
            const data = req.body;
            await HeroSpecialties.findByIdAndUpdate(_id, data)
            return res.sendStatus(201);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    delete: async (req, res) => {
        try {
            const _id = req.params.id
            const heroSpecialty = await HeroSpecialties.findById(_id)
            if (!heroSpecialty) return res.status(400).json({ message: AlertMessage.documentNotFound })
            await HeroSpecialties.findByIdAndDelete(_id)
            return res.sendStatus(201);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
}
export default heroSpecialtiesController;