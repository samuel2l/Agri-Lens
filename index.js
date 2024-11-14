const express=require('express')
const path=require('path')
const app=express()
const mongoose=require('mongoose')
const Product=require('./models/product')
const print=console.log
const methodOverride=require('method-override')//to allow us use patch put type requests
app.use(methodOverride('_method'))

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
    newProduct.save()
    .then(
        (res)=>{
            print(res)
        })
    .catch((e)=>{print(e)})
    
    res.redirect('/products')

})


app.get('/products/:id',async (req,res)=>{
    const id=req.params.id
    
    const product=await Product.find({_id:id})
    //you can also use findById to make search simpler
    
    

    res.render('product_details.ejs',{product:product[0]})

})
app.get('/products/:id/edit',async(req,res)=>{
    const id=req.params.id
    const product=await Product.find({_id:id})

    res.render('update_product.ejs',{product:product[0],id})

})


app.patch('/products/:id',async (req,res)=>{
    const id=req.params.id
    
    let product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    //new true means it will return the updated instance.

    print(product)
    print('HMMMMM')
    print(req.body)
    res.redirect(`/products/${id}`)

})


app.delete('/products/:id',async (req,res)=>{
    const id=req.params.id
    
    let deletedProduct=await Product.findByIdAndDelete(id)
    //new true means it will return the updated instance.

    res.redirect(`/products`)

})






app.listen(3000,()=>{
    print('server up and running')
    
})