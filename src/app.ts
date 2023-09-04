import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { AppRouter } from './routes'
import responseData from './shared/response'
import httpStatus from 'http-status'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//router
app.use('/api/v1', AppRouter)



//route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  responseData({
    statusCode: httpStatus.NOT_FOUND,
    status: false,
    message: 'Api route not found',
  }, res);
  next();
});




export default app