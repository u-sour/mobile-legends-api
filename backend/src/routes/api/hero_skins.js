import express from "express";
import apicache from 'apicache'
import heroSkinsControllers from "../../controllers/heroSkinsController";
const router = express.Router()

// Init cache
let cache = apicache.middleware

if (process.env.PROJECT_MODE === 'Production') {
    router.get('/hero-skins/public/search', cache('5 minutes'), heroSkinsControllers.findAsPublic)
    router.get('/hero-skins/public/id/:id', cache('5 minutes'), heroSkinsControllers.findAsPublic)
    router.get('/hero-skins/public', cache('5 minutes'), heroSkinsControllers.findAsPublic)
} else {
    router.get('/hero-skins/public/search', heroSkinsControllers.findAsPublic)
    router.get('/hero-skins/public/id/:id', heroSkinsControllers.findAsPublic)
    router.get('/hero-skins/public', heroSkinsControllers.findAsPublic)
}

export default router;