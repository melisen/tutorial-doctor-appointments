import express from 'express'
import {updateUser, deleteUser, getSingleUser, getAllUsers} from '../Controllers/userController.js'
import {authenticate, restrict} from '../auth/verifyToken.js'

const router = express.Router();



router.get('/:id', authenticate, restrict(["patient"]), getSingleUser)
router.get('/', authenticate, restrict(["admin"]), getAllUsers)
router.put('/:id',authenticate, restrict(["patient"]), updateUser)
router.delete('/:id',authenticate, restrict(["patient"]), deleteUser)

export default router;

//min 58 del video como probar postman con Bearer Token (copiarlo sin comillas)