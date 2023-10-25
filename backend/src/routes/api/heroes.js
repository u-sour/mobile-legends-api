import express from "express";
import apicache from 'apicache'
import authMiddleware from "../../middleware/auth";
import heroesController from "../../controllers/heroesController";
const router = express.Router()

// Init cache
let cache = apicache.middleware

if (process.env.PROJECT_MODE === 'Production') {
    router.get('/heroes/hero/:id', cache('5 minutes'), heroesController.findOne)
    router.get('/heroes/:selector?', cache('5 minutes'), heroesController.find)
    router.get('/pub-heroes/:selector?', cache('5 minutes'), heroesController.findWithAggregate)
} else {
    router.get('/heroes/hero/:id', heroesController.findOne)
    router.get('/heroes/:selector?', heroesController.find)
    router.get('/pub-heroes/:selector?', heroesController.findWithAggregate)
}
router.post('/heroes', authMiddleware, heroesController.create)
router.patch('/heroes/:id', authMiddleware, heroesController.edit)
router.delete('/heroes/:id', authMiddleware, heroesController.delete)
export default router;