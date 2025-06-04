import express, { Express } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import router from './routes'

// Environment variables
config()

// Express
const app: Express = express()
const port: number = Number(process.env.PORT) || 8080

// Middlewares
app.use(express.json())
app.use(cookieParser())

// CORS
app.use(
  cors({
    origin: [process.env.WEB_BASE_URL as string, process.env.API_BASE_URL as string],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true,
  })
)

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    myapi: '0.0.1',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the application',
    },
    servers: [
      {
        url: process.env.API_BASE_URL as string,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Routes
app.use('/api/', router)

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at :${port}`)
})
