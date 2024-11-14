//seed the db so you have some data to start out with
const Product=require('./models/product')
const mongoose=require('mongoose')
const print=console.log
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
  }
  main().then(()=>{
      print('connection sauce')
  }).
  catch(err => console.log(err));
// const product=new Product({
//     name:'grape',
//     price:5,
//     category:'fruit'
// })
// product.save().then(
//     (res)=>{
//         print('yeah it worked')
//         print(res)
//     }
// ).catch((e)=>{
//     print(e)
// })

Product.insertMany([
    {
        name:'passion fruit',
        price:15,
        category:'fruit'
    },
    {
        name:'carrot',
        price:3,
        category:'vegetable'
    },
    {
        name:'cabbage',
        price:7,
        category:'vegetable'
    },
    {
        name:'whole milk',
        price:10,
        category:'dairy'
    },

])