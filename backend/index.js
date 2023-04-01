const { json } = require("express");
const express = require("express");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt=require("Jsonwebtoken");


const cors = require("cors")
require("./db/config")

const dotenv=require("dotenv");
const connectDb = require("./db/config");
dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())

connectDb();

const port=process.env.PORT || 5001

app.post('/register', async (req, res) => {
      const user = new User(req.body)
      let result = await user.save()
      result = result.toObject();
      delete result.password;
      if(result){{
                  Jwt.sign({result},process.env.Secret_Key,{expiresIn:'1h'},(err,token)=>{
                        if(err){
                              res.send({result:"something went wrong,Please try after sometime."})
                        }
                        res.send({result,auth:token})
                  })
                  
            }
      }
     
   
})

app.post('/login',async (req, res) => {
      if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select("-password")
            if (user) {
                  Jwt.sign({user},process.env.Secret_Key,{expiresIn:'1h'},(err,token)=>{
                        if(err){
                              res.send({result:"something went wrong,Please try after sometime."})
                        }
                        res.send({user,auth:token})
                  })
                  
            }
            else {
                  res.send({ result: 'No user found' })
            }
      }
      else {
            res.send({ result: 'No user found' })
      }


})

app.post('/add/product', async (req, res) => {
      let product = new Product(req.body);
      let result = await product.save();
      res.send(result)
})

app.get('/list/products', async (req, res) => {
      let product = await Product.find();
      if (product.length > 0) {
            res.send(product);
      }
      else {
            res.send({ result: "No Product Found" })
      }
})

app.delete('/delete/product/:id', async (req, res) => {
      let result = await Product.deleteOne({ _id: req.params.id });
      res.send(result)

})

app.get('/product/:id', async (req, res) => {
      const {id} = req.params;
      let result = await Product.findOne({ _id:id})
      if (result) {
            res.send(result)
      }
      else {
            res.send({ result:"No record found"})
      }
})


app.put('/product/:id', async(req, res)=>{
      let {id} = req.params;
      let result = await Product.updateOne(
            {_id:id},
            {
                  $set:req.body
            }
      )
      res.send(result)
})


app.get('/search/:key',async(req,res)=>{
      let result= await Product.find({
            "$or":[
                  {name:{$regex:req.params.key}},
                  {company:{$regex:req.params.key}},
                  {category:{$regex:req.params.key}}
            ]
      })
      res.send(result)
})

const verifyToken=(req,res,next)=>{

        
}


app.listen(port,()=>{
      console.log(`Sever is running on ${port}`)
})