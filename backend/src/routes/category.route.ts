import express from 'express'

export const categoryRouter = express.Router()

import { createCategory } from '../controller/category.controller'

categoryRouter.post('/create', createCategory)
