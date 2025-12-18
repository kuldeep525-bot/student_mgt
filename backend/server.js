const express =require('express');
const app=express();

app.get("/",(req,res)=>{
  res.send("First")
})

// feature
app.get("/feature",(req,res)=>{
  res.send("second")
})


app.listen(4000,()=>{
  console.log("app running at port : ", 4000)

})