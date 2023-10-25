import HeroSpecialties from "../models/HeroSpecialties"
import AlertMessage from "../utils/alert-message"

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
            const selector = JSON.parse(req.params.selector)
            const heroSpecialties = await HeroSpecialties.find(selector)
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
            console.log("🚀 ~ file: heroSpecialtiesController.js:40 ~ edit: ~ error:", error)
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
            console.log("🚀 ~ file: heroSpecialtiesController.js:49 ~ delete: ~ error:", error)
            return res.status(400).json({ message: error });
        }
    },
}
export default heroSpecialtiesController;