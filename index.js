const express=require('express')
const path=require('path')
const app=express()
const mongoose=require('mongoose')
const product=require('./models/product')
const print=console.log
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'view'))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
  }
  main().then(()=>{
      print('connection sauce')
  }).
  catch(err => console.log(err));
  

app.listen(3000,()=>{
    print('server up and running')
    
})