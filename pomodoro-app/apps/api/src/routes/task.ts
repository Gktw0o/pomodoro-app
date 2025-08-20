import express from 'express'
import { body, param } from 'express-validator'
import { asyncHandler } from '../middleware/errorHandler'

const router = express.Router()

// Placeholder task controller functions
const getTasks = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Get tasks endpoint - Coming soon' })
})

const createTask = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Create task endpoint - Coming soon' })
})

const getTask = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Get task endpoint - Coming soon' })
})

const updateTask = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Update task endpoint - Coming soon' })
})

const deleteTask = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Delete task endpoint - Coming soon' })
})

const toggleTaskComplete = asyncHandler(async (req: express.Request, res: express.Response) => {
  res.json({ message: 'Toggle task complete endpoint - Coming soon' })
})

// Routes
router.get('/', getTasks)

router.post('/', [
  body('title').trim().isLength({ min: 1 }),
  body('description').optional().trim(),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('dueDate').optional().isISO8601(),
  body('projectId').optional().isUUID()
], createTask)

router.get('/:id', [
  param('id').isUUID()
], getTask)

router.put('/:id', [
  param('id').isUUID(),
  body('title').optional().trim().isLength({ min: 1 }),
  body('description').optional().trim(),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('dueDate').optional().isISO8601(),
  body('completed').optional().isBoolean()
], updateTask)

router.delete('/:id', [
  param('id').isUUID()
], deleteTask)

router.patch('/:id/toggle', [
  param('id').isUUID()
], toggleTaskComplete)

export default router