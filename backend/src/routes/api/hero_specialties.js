import express from "express";
import apicache from 'apicache'
import authMiddleware from "../../middleware/auth";
import heroSpecialtiesController from "../../controllers/heroSpecialtiesController";
const router = express.Router()

// Init cache
let cache = apicache.middleware

if (process.env.PROJECT_MODE === 'Production') {
    router.get('/hero-specialties/specialty/:id', cache("5 minutes"), heroSpecialtiesController.findOne)
    router.get('/hero-specialties/:selector?', cache("5 minutes"), heroSpecialtiesController.find)
} else {
    router.get('/hero-specialties/specialty/:id', heroSpecialtiesController.findOne)
    router.get('/hero-specialties/:selector?', heroSpecialtiesController.find)
}
router.post('/hero-specialties', authMiddleware, heroSpecialtiesController.create)
router.patch('/hero-specialties/:id', authMiddleware, heroSpecialtiesController.edit)
router.delete('/hero-specialties/:id', authMiddleware, heroSpecialtiesController.delete)

export default router;