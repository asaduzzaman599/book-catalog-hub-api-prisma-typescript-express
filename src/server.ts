import app from "./app"
import config from "./config"

async function main() {


  app.listen(config.PORT,()=>{
    console.log(`Server running port: ${config.PORT}`)
  })
}

main()