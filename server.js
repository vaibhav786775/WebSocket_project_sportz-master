const  express  = require('express')

const app = express()
const port = 8080

app.use(express.json())

app.get('/',(req,res)=>{
  res.send('hello from express server')

})

app.listen(port,()=>{
  console.log(`server is running on port http://localhost:${port}`);
})
