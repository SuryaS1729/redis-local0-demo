import express from "express";

import { createClient } from "redis";


const app = express()

app.use(express.json());


const client = createClient()
client.connect()

app.post("/submit", async (req,res)=>{
    const {problemId, userId, code, language } = req.body
    //after this we ideally first send it to a prisma database postgres , you can implement that logic here
  try {
    await  client.lPush("submissions",JSON.stringify({problemId, userId, code, language}))
    res.json({
        message:"submission recieved"
    })
  } catch (e) { 
    res.json({
        message:"submission failed"
    })
  }
})

app.listen(3000)