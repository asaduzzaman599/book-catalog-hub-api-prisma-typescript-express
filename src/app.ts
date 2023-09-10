import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/global-error";
import { AppRouter } from "./routes";
import responseData from "./shared/response";
import config from "./config"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use("/api/v1", AppRouter);

//global error handler
app.use(globalErrorHandler);

app.get('/', (req,res)=>{
  return res.status(httpStatus.OK).json({
    success: true,
    message: `Server running port at ${config.PORT}`
  })
  
})

//route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  return responseData(
    {
      statusCode: httpStatus.NOT_FOUND,
      status: false,
      message: "Api route not found",
    },
    res
  );
});

export default app;
