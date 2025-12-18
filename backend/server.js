const express =require('express');
const app=express();

app.get("/",(req,res)=>{
  res.send("First")
})


app.listen(4000,()=>{
  console.log("app running at port : ", 4000)

})