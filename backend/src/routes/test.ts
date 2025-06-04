import { Router } from 'express'

const testRouter = Router()

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test endpoint
 *     description: Returns a simple Hello World message
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World
 */
testRouter.get('/test', (req, res) => {
  res.send('Hello World')
})

export default testRouter
