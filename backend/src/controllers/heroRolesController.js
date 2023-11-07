import HeroRoles from "../models/HeroRoles"
import cloudinary from "../config/cloudinary"
import AlertMessage from "../utils/alert-message"
import mongoose from "mongoose"
const { ObjectId } = mongoose.Types;

const heroRolesController = {
    findOne: async (req, res) => {
        try {
            const _id = req.params.id
            const heroRole = await HeroRoles.findById(_id)
            return res.status(200).json(heroRole);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    find: async (req, res) => {
        try {
            let selector = JSON.parse(req.query.selector)
            const heroRoles = await HeroRoles.find(selector)
            return res.status(200).json(heroRoles);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    findAsPublic: async (req, res) => {
        try {
            const selector = {}
            if (req.params.id) selector['_id'] = new ObjectId(req.params.id)
            const heroRoles = await HeroRoles.find(selector, { __v: 0, created_at: 0, updated_at: 0 })
            return res.status(200).json(heroRoles);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    create: async (req, res) => {
        try {
            const data = req.body;
            const folderName = `Hero Roles`
            const iconUploaded = await cloudinary.uploader.upload(data.icon_base, { folder: folderName })
            data.icon_public_id = iconUploaded.public_id
            data.icon_url = iconUploaded.secure_url
            await HeroRoles.create(data)
            return res.sendStatus(201);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    edit: async (req, res) => {
        try {
            const _id = req.params.id
            const heroRole = await HeroRoles.findById(_id) // data from server side
            if (!heroRole) return res.status(400).json({ message: AlertMessage.documentNotFound })
            const folderName = `Hero Roles`
            const data = req.body;
            // check if skin.icon_public_id is existed then delete it from cloudinary 
            if (data.icon_public_id) {
                await cloudinary.uploader.destroy(data.icon_public_id)
            }
            //upload a new image file
            const iconUploaded = await cloudinary.uploader.upload(data.icon_base, { folder: folderName })
            data.icon_public_id = iconUploaded.public_id
            data.icon_url = iconUploaded.secure_url
            await HeroRoles.findByIdAndUpdate(_id, data)
            return res.sendStatus(201);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    delete: async (req, res) => {
        try {
            const _id = req.params.id
            const heroRole = await HeroRoles.findById(_id)
            if (!heroRole) return res.status(400).json({ message: AlertMessage.documentNotFound })
            if (heroRole.icon_public_id) {
                await cloudinary.uploader.destroy(heroRole.icon_public_id)
            }
            await HeroRoles.findByIdAndDelete(_id)
            return res.sendStatus(201);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
}
export default heroRolesController;