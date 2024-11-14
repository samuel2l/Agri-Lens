const express=require('express')
const path=require('path')
const app=express()
const mongoose=require('mongoose')
const Product=require('./models/product')
const print=console.log
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({extended:true}))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
  }
  main().then(()=>{
      print('connection sauce')
  }).
  catch(err => console.log(err));

  app.get('/products/new', (req,res)=>{
 res.render('add_product.ejs')
})


app.get('/products',async (req,res)=>{
    const products=await Product.find({})
    print(products)

    res.render('products.ejs',{products})

})
app.post('/products',async (req,res)=>{
    const {name,price,category}=req.body
    print('results from post request!!!!!!!!!!!')
    const newProduct= new Product({name,price,category})
    newProduct.save().then((res)=>{print(res)}).catch((e)=>{print(e)})
    
    res.send('be like it sauce ooooo')

})


app.get('/products/:id',async (req,res)=>{
    const id=req.params.id
    
    const product=await Product.find({_id:id})
    //you can also use findById to make search simpler
    
    

    res.render('product_details.ejs',{product:product[0]})

})





app.listen(3000,()=>{
    print('server up and running')
    
})