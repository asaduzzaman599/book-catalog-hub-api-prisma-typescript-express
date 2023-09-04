import express from 'express'
import cors from 'cors'
import { AppRouter } from './routes'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//router
app.use('/api/v1', AppRouter)




export default app