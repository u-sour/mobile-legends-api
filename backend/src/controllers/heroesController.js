import Heroes from "../models/Heroes"
import cloudinary from "../config/cloudinary"
import AlertMessage from "../utils/alert-message"

const heroesController = {
    findOne: async (req, res) => {
        try {
            const _id = req.params.id
            const hero = await Heroes.findById(_id)
            return res.status(200).json(hero);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    find: async (req, res) => {
        try {
            const selector = JSON.parse(req.params.selector)
            const heroes = await Heroes.find(selector)
            return res.status(200).json(heroes);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    findWithAggregate: async (req, res) => {
        try {
            const selector = JSON.parse(req.params.selector)
            let pipeline = [
                { $match: selector },
                { $unwind: { path: "$roleIds", preserveNullAndEmptyArrays: true, } },
                {
                    $lookup: {
                        from: "hero_roles",
                        localField: "roleIds",
                        foreignField: "_id",
                        as: "roleIds"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        code: { $last: "$code" },
                        name: { $last: "$name" },
                        roleIds: { $push: { $last: "$roleIds" } },
                        specialtyIds: { $last: "$specialtyIds" },
                        lane: { $last: "$lane" },
                        release_year: { $last: "$release_year" },
                        battle_points: { $last: "$battle_points" },
                        ticket: { $last: "$ticket" },
                        lucky_gem: { $last: "$lucky_gem" },
                        skins: { $last: "$skins" },
                        skills: { $last: "$skills" },
                        base_attributes: { $last: "$base_attributes" },
                    }
                },
                { $unwind: { path: "$specialtyIds", preserveNullAndEmptyArrays: true, } },
                {
                    $lookup: {
                        from: "hero_specialties",
                        localField: "specialtyIds",
                        foreignField: "_id",
                        as: "specialtyIds"
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        code: { $last: "$code" },
                        name: { $last: "$name" },
                        roleIds: { $last: "$roleIds" },
                        specialtyIds: { $push: { $last: "$specialtyIds" } },
                        lane: { $last: "$lane" },
                        release_year: { $last: "$release_year" },
                        battle_points: { $last: "$battle_points" },
                        ticket: { $last: "$ticket" },
                        lucky_gem: { $last: "$lucky_gem" },
                        skins: { $last: "$skins" },
                        skills: { $last: "$skills" },
                        base_attributes: { $last: "$base_attributes" },
                    }
                }
            ]
            const heroes = await Heroes.aggregate(pipeline)
            console.log("🚀 ~ file: heroesController.js:83 ~ findWithAggregate: ~ heroes:", heroes)
            return res.status(200).json(heroes);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    },
    create: async (req, res) => {
        try {
            const data = req.body;
            const folderName = `Hero Skins: ${data.code} - ${data.name}`
            for (let index = 0; index < data.skins.length; index++) {
                const skin = data.skins[index];
                const iconUploaded = await cloudinary.uploader.upload(skin.icon_base, { folder: folderName })
                const splashArtUploaded = await cloudinary.uploader.upload(skin.splash_art_base, { folder: folderName })

                skin.icon_public_id = iconUploaded.public_id
                skin.icon_url = iconUploaded.secure_url
                skin.icon_file_name = skin.icon_file_name
                skin.splash_art_public_id = splashArtUploaded.public_id
                skin.splash_art_url = splashArtUploaded.secure_url
                skin.splash_art_file_name = skin.splash_art_file_name
            }
            await Heroes.create(data)
            return res.sendStatus(201);
        } catch (error) {
            console.log("🚀 ~ file: heroesController.js:28 ~ create: ~ error:", error)
            return res.status(400).json({ message: error });
        }

    },
    edit: async (req, res) => {
        try {
            const _id = req.params.id
            const hero = await Heroes.findById(_id) // server side
            if (!hero) return res.status(400).json({ message: AlertMessage.documentNotFound })
            const data = req.body; //client side
            const folderName = `Hero Skins: ${data.code} - ${data.name}`

            // Note: when user remove skin and update
            // check the different data array object "skins" server side and client side 
            const differenceSkins = hero.skins.filter(({ icon_public_id: idFromServer }) => !data.skins.some(({ icon_public_id: idFromClient }) => idFromServer === idFromClient));
            if (differenceSkins.length > 0) {
                for (let index = 0; index < differenceSkins.length; index++) {
                    const skin = differenceSkins[index];
                    // check if skin.icon_public_id && skin.splash_art_public_id are existed then delete it from cloudinary 
                    if (skin.icon_public_id && skin.splash_art_public_id) {
                        await cloudinary.uploader.destroy(skin.icon_public_id)
                        await cloudinary.uploader.destroy(skin.splash_art_public_id)
                    }
                }
            }
            console.log("🚀 ~ file: heroesController.js:59 ~ edit: ~ differenceSkins:", differenceSkins)

            for (let index = 0; index < data.skins.length; index++) {
                const skin = data.skins[index];
                // check if skin.icon_public_id && skin.splash_art_public_id are existed then delete it from cloudinary 
                if (skin.icon_public_id && skin.splash_art_public_id) {
                    await cloudinary.uploader.destroy(skin.icon_public_id)
                    await cloudinary.uploader.destroy(skin.splash_art_public_id)
                }
                //upload a new image file
                const iconUploaded = await cloudinary.uploader.upload(skin.icon_base, { folder: folderName })
                const splashArtUploaded = await cloudinary.uploader.upload(skin.splash_art_base, { folder: folderName })

                skin.icon_public_id = iconUploaded.public_id
                skin.icon_url = iconUploaded.secure_url
                skin.icon_file_name = skin.icon_file_name
                skin.splash_art_public_id = splashArtUploaded.public_id
                skin.splash_art_url = splashArtUploaded.secure_url
                skin.splash_art_file_name = skin.splash_art_file_name
            }

            await Heroes.findByIdAndUpdate(_id, data)
            return res.sendStatus(201);
        } catch (error) {
            console.log("🚀 ~ file: heroesController.js:92 ~ edit: ~ error:", error)
            return res.status(400).json({ message: error });
        }
    },
    delete: async (req, res) => {
        try {
            const _id = req.params.id
            const hero = await Heroes.findById(_id)
            if (!hero) return res.status(400).json({ message: AlertMessage.documentNotFound })
            for (let index = 0; index < hero.skins.length; index++) {
                const skin = hero.skins[index];
                if (skin.icon_public_id && skin.splash_art_public_id) {
                    await cloudinary.uploader.destroy(skin.icon_public_id)
                    await cloudinary.uploader.destroy(skin.splash_art_public_id)
                }
            }
            await Heroes.findByIdAndDelete(_id)
            return res.sendStatus(201);
        } catch (error) {
            console.log("🚀 ~ file: heroesController.js:110 ~ delete: ~ error:", error)
            return res.status(400).json({ message: error });
        }
    },
}
export default heroesController;