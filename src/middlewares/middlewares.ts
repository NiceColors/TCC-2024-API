import { auth } from './auth.middlewares'
import { permission } from './permission.middlewares'

export const middlewares = { auth, permission } 