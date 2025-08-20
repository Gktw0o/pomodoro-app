import express from 'express'
import { body } from 'express-validator'
import { asyncHandler } from '../middleware/errorHandler'

const router = express.Router()

// Placeholder auth controller functions
const register = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Register endpoint - Coming soon' })
})

const login = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Login endpoint - Coming soon' })
})

const logout = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Logout endpoint - Coming soon' })
})

const forgotPassword = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Forgot password endpoint - Coming soon' })
})

const resetPassword = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Reset password endpoint - Coming soon' })
})

// Routes
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2 })
], register)

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], login)

router.post('/logout', logout)

router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], forgotPassword)

router.post('/reset-password', [
  body('token').exists(),
  body('password').isLength({ min: 6 })
], resetPassword)

export default router