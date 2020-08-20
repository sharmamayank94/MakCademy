var express = require('express');
var knex = require('knex');
var bodyParser = require('body-parser');
var ejs = require('ejs')

var app = express()

knex = knex({
    client: 'mysql',
    connection:{
        host: 'localhost',
        user: 'root',
        password: 'test',
        database: 'quizapp'
    }
});

app.use('/public', express.static('static'))
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('home.ejs');
});

app.get('/history', (req, res)=>{
    knex('history').select('Classification').distinct('Classification')
    .then(data=>{
        res.render('history', {data, sets:[]});
    })
});

app.get('/history/:sub/:page_no', (req, res)=>{
    var currentsub = req.params.sub;
    var page_no = req.params.page_no;
    knex('history').select('title', 'set_no')
    .distinct('title')
    .where('Classification', '=', currentsub).andWhere('page_no', '=', page_no)
    .then(sets=>{
        
        res.render('history',{data:['Ancient', 'Medieval', 'Modern'], sets, currentsub, page_no, questions:[]});
    });     
});

app.get('/history/:sub/:page_no/:set_no', (req, res)=>{
    var currentsub = req.params.sub;
    var page_no = req.params.page_no;
    var set_no = req.params.set_no;

    knex('history').select('*')
    .where('Classification', '=', currentsub)
    .andWhere('page_no', '=', page_no)
    .andWhere('set_no', '=', set_no)
    .then(questions=>{
        console.log(questions);
        res.render('questions', {data:['Ancient', 'Medieval', 'Modern'], sets:[], currentsub, page_no, questions});
    });     
});

app.listen(8080, (a, b)=>{
    console.log("server is listening on port 8080");
})