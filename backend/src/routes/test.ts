import { Router, Request, Response, RequestHandler } from 'express'
import { pool } from '../utils/db'

const testRouter = Router()

const testHandler: RequestHandler = async (req: Request, res: Response) => {
  let client
  try {
    client = await pool.connect()

    let selected = await client.query(`SELECT * FROM users`)

    if (selected.rowCount === 0) {
      res.status(404).json({ message: 'Users not found' })
      return
    }

    res.status(200).json({ message: 'Users found', users: selected.rows })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

testRouter.get('/test', testHandler)

export default testRouter
