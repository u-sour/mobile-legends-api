import express from "express";
import apicache from 'apicache'
import authMiddleware from "../../middleware/auth";
import heroRolesController from "../../controllers/heroRolesController";
const router = express.Router()

// Init cache
let cache = apicache.middleware

if (process.env.PROJECT_MODE === 'Production') {
    router.get('/hero-roles/role/:id', cache("5 minutes"), heroRolesController.findOne)
    router.get('/hero-roles/:selector?', cache("5 minutes"), heroRolesController.find)
} else {
    router.get('/hero-roles/role/:id', heroRolesController.findOne)
    router.get('/hero-roles/:selector?', heroRolesController.find)
}
router.post('/hero-roles', authMiddleware, heroRolesController.create)
router.patch('/hero-roles/:id', authMiddleware, heroRolesController.edit)
router.delete('/hero-roles/:id', authMiddleware, heroRolesController.delete)

export default router;