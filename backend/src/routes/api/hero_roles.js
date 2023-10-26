import express from "express";
import apicache from 'apicache'
import authMiddleware from "../../middleware/auth";
import heroRolesController from "../../controllers/heroRolesController";
const router = express.Router()

// Init cache
let cache = apicache.middleware

if (process.env.PROJECT_MODE === 'Production') {
    router.get('/hero-roles/public/id/:id', cache("5 minutes"), heroRolesController.findAsPublic)
    router.get('/hero-roles/public', cache("5 minutes"), heroRolesController.findAsPublic)
} else {
    router.get('/hero-roles/public/id/:id', heroRolesController.findAsPublic)
    router.get('/hero-roles/public', heroRolesController.findAsPublic)
}
router.get('/hero-roles', authMiddleware, heroRolesController.find)
router.get('/hero-roles/:id', authMiddleware, heroRolesController.findOne)
router.post('/hero-roles', authMiddleware, heroRolesController.create)
router.patch('/hero-roles/:id', authMiddleware, heroRolesController.edit)
router.delete('/hero-roles/:id', authMiddleware, heroRolesController.delete)

export default router;