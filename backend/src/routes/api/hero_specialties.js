import express from "express";
import apicache from 'apicache'
import authMiddleware from "../../middleware/auth";
import heroSpecialtiesController from "../../controllers/heroSpecialtiesController";
const router = express.Router()

// Init cache
let cache = apicache.middleware

if (process.env.PROJECT_MODE === 'Production') {
    router.get('/hero-specialties/public/id/:id', cache("5 minutes"), heroSpecialtiesController.findAsPublic)
    router.get('/hero-specialties/public', cache("5 minutes"), heroSpecialtiesController.findAsPublic)
} else {
    router.get('/hero-specialties/public/id/:id', heroSpecialtiesController.findAsPublic)
    router.get('/hero-specialties/public', heroSpecialtiesController.findAsPublic)
}
router.get('/hero-specialties', authMiddleware, heroSpecialtiesController.find)
router.get('/hero-specialties/:id', authMiddleware, heroSpecialtiesController.findOne)
router.post('/hero-specialties', authMiddleware, heroSpecialtiesController.create)
router.patch('/hero-specialties/:id', authMiddleware, heroSpecialtiesController.edit)
router.delete('/hero-specialties/:id', authMiddleware, heroSpecialtiesController.delete)

export default router;