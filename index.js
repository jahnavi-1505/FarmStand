const express=require('express');
const app=express();
const path=require('path');
const methodOverride=require('method-override')
app.use(methodOverride('_method'))

const mongoose=require('mongoose');
const Product=require('./models/product');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(()=>{
       console.log("MONGO OPEN!!") 
    })
    .catch(err=>{
        console.log("oh no error :(")
        console.log(err)
    })

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))

const categories=['fruits','vegetables','dairy'];
app.get('/products',async(req,res)=>{
    const products=await Product.find({})
    res.render('products/index',{products})
})
app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories})
})
app.post('/products',async(req,res)=>{
    const newProduct=new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})
app.get('/products/:id', async(req,res)=>{
    const{id}=req.params;
    const product=await Product.findById(id)
    res.render('products/show',{product})
})

app.get('/products/:id/edit', async(req,res)=>{
    const{id}=req.params;
    const product=await Product.findById(id)
    res.render('products/edit',{product,categories})
})

app.delete('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const deletedProduct=await Product.findByIdAndDelete(id);
    res.redirect('/products');
})
app.put('/products/:id',async(req,res)=>{
    const{id}=req.params;
    const product= await Product.findByIdAndUpdate(id,req.body,{runValidators:true, new:true});
    res.redirect(`/products/${product._id}`)
})

app.listen(3000,()=>{
    console.log("APP IS LISTENING ON PORT 3000")
})


