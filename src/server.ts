import app from "./app"
import config from "./config"
import httpStatus from "http-status"

function main() {

  app.get('/', async (req,res)=>{
    console.log('Hello Server')
    return res.status(httpStatus.OK).json({
      success: true,
      message: `Server running port at ${config.PORT}`
    })
    
  })


  app.listen(config.PORT,()=>{
    console.log(`Server running port: ${config.PORT}`)
  })
}

main()