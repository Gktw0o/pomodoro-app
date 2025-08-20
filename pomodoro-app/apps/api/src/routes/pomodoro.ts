import express from 'express'
import { body, param } from 'express-validator'
import { asyncHandler } from '../middleware/errorHandler'

const router = express.Router()

// Placeholder pomodoro controller functions
const getSessions = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Get pomodoro sessions endpoint - Coming soon' })
})

const createSession = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Create pomodoro session endpoint - Coming soon' })
})

const updateSession = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Update pomodoro session endpoint - Coming soon' })
})

const completeSession = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Complete pomodoro session endpoint - Coming soon' })
})

const getActiveSession = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Get active session endpoint - Coming soon' })
})

const pauseSession = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Pause session endpoint - Coming soon' })
})

const resumeSession = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Resume session endpoint - Coming soon' })
})

// Routes
router.get('/', getSessions)

router.get('/active', getActiveSession)

router.post('/', [
  body('type').isIn(['work', 'short_break', 'long_break']),
  body('duration').isInt({ min: 1, max: 120 }),
  body('taskId').optional().isUUID()
], createSession)

router.put('/:id', [
  param('id').isUUID(),
  body('duration').optional().isInt({ min: 1, max: 120 }),
  body('taskId').optional().isUUID()
], updateSession)

router.patch('/:id/complete', [
  param('id').isUUID()
], completeSession)

router.patch('/:id/pause', [
  param('id').isUUID()
], pauseSession)

router.patch('/:id/resume', [
  param('id').isUUID()
], resumeSession)

export default router