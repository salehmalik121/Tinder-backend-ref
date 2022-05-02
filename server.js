import express from 'express';
import mongoose from 'mongoose';
import Cards from '../server/dbcards.js';
import Cors from 'Cors';
// App config
const connection_url = "mongodb+srv://admin:dn2m19GUjVgc06LI@cluster0.jkahn.mongodb.net/TinderDB?retryWrites=true&w=majority"
const app = express();
const port = 3001;
// middleware 
app.use(express.json());
app.use(Cors());
//DB configurable
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
//Api end 
app.get('/' , (req,res)=>res.status(200).send("<h1>Welcome to backend</h1>"));

app.post("/tinder/cards" , (req , res)=>{
    const dbcard = req.body;
    Cards.create(dbcard , (err , data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})
app.get("/tinder/cards" , (req,res)=>{
    Cards.find( (err , data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

//Listiner
app.listen(port,()=>{
    console.log(`listining to port ${port}`);
})
