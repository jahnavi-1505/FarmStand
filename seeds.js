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
const p=new Product({
    name:'Grape Fruit',
    price:1.99,
    category:'fruits'
})
p.save().then(p=>{
    console.log(p)
})
.catch(err=>{
    console.log(err)
})

const seedProducts=[
    {
        name:'Fairy Eggplant',
        price:1.00,
        category:'vegetable'
    },
    {
        name:'Melon',
        price:4.99,
        category:'fruits'
    },
    {
    name:'Seedless Watermelon',
        price:3.99,
        category:'fruits'
    },
    {
        name:'Organic celery',
        price:1.50,
        category:'vegetable'
    },
    {
        name:'Chocolate Whole Milk',
        price:2.69,
        category:'dairy'
    }
]

Product.insertMany(seedProducts)
.then(res=>{
    console.log(res)
})
.catch(err=>{
    console.log(err)
})