import express from "express";
import apicache from 'apicache'
import authMiddleware from "../../middleware/auth";
import heroesController from "../../controllers/heroesController";
const router = express.Router()

// Init cache
let cache = apicache.middleware

if (process.env.PROJECT_MODE === 'Production') {
    router.get('/heroes/public/id/:id', cache('5 minutes'), heroesController.findAsPublic)
    router.get('/heroes/public', cache('5 minutes'), heroesController.findAsPublic)
} else {
    router.get('/heroes/public/id/:id', heroesController.findAsPublic)
    router.get('/heroes/public', heroesController.findAsPublic)
}
router.get('/heroes/count', authMiddleware, heroesController.count)
router.get('/heroes', authMiddleware, heroesController.find)
router.get('/heroes/:id', authMiddleware, heroesController.findOne)
router.post('/heroes', authMiddleware, heroesController.create)
router.patch('/heroes/:id', authMiddleware, heroesController.edit)
router.delete('/heroes/:id', authMiddleware, heroesController.delete)
export default router;