var express = require('express');
var knex = require('knex');
var bodyParser = require('body-parser');
var ejs = require('ejs')

var app = express()

// knex = knex({
//     client: 'pg',
//     connection:{
//         host: 'localhost',
//         user: 'postgres',
//         password: 'test',
//         database: 'quizapp'
//     }
// });

knex = knex({
    client: 'pg',
    connection:{
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});
app.use('/public', express.static('static'))
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('home.ejs');
});

app.get('/history', (req, res)=>{
    knex('history').select('classification').distinct('classification')
    .then(data=>{
        res.render('history', {data, sets:[]});
    })
    .catch(err=>{
        res.send(err);
    });
});

app.get('/history/:sub/:page_no', (req, res)=>{
    var currentsub = req.params.sub;
    var page_no = req.params.page_no;
    knex('history').select('title', 'set_no')
    .distinct('title')
    .where('classification', '=', currentsub).andWhere('page_no', '=', page_no)
    .then(sets=>{
        console.log("Set is: ",sets);
        res.render('history',{data:['Ancient', 'Medieval', 'Modern'], sets, currentsub, page_no, questions:[]});
    })
     .catch(err=>{
        res.send(err);
    });     
});

app.get('/history/:sub/:page_no/:set_no', (req, res)=>{
    var currentsub = req.params.sub;
    var page_no = req.params.page_no;
    var set_no = req.params.set_no;

    knex('history').select('*')
    .where('classification', '=', currentsub)
    .andWhere('page_no', '=', page_no)
    .andWhere('set_no', '=', set_no)
    .then(questions=>{
        console.log(questions);
        res.render('questions', {data:['Ancient', 'Medieval', 'Modern'], sets:[], currentsub, page_no, questions});
    })
     .catch(err=>{
        res.send(err);
    });;     
});

app.listen(process.env.PORT || 8080, (a, b)=>{
    console.log("server is listening on port 8080");
})