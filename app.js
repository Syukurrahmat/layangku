const path          = require('path')
const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')
const flash         = require('req-flash');
const session       = require('express-session') 
const Data          = require('./config/db')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static( "views" ) )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.get('/', (req,res)=>{
    res.render('home')
})
app.get('/send', (req,res)=>{
    res.render('make')
})

app.get('/message', async (req,res)=>{
    let data  = await Data.findAll({where:{receiver : req.query.name}});
    data.forEach(e =>{if (e.message.length>170) e.message = e.message.substr(1, 170) + ' (...)' })
    res.render('list',{data:data , receiver:req.query.name})
})

app.post('/message', async (req,res)=>{
    let data  = await Data.findAll({where:{id : req.body.id}});
    res.json(data)
})


app.get('/review',(req,res)=>{
    if(req.flash('data')==undefined){
         res.redirect('/')
    }else{
        res.render('review',req.flash('data'))
    }
})

app.post('/send', async(req,res)=>{
    if((req.body.receiver == '' || req.body.message == '' )|| req.body.title.length>30) return res.redirect('/send')
    await Data.create(req.body);
    req.flash('data',req.body)
    res.redirect('/review')
})



app.listen(3000,()=>console.log('server berjalan'))



