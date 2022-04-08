import express from 'express';
import chalk from  'chalk';
import Debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import sessions from './src/data/sessions.json' assert {type: 'json'};
// const { default: sessions } = await import('./src/data/sessions.json', {
//     assert: {
//       type: 'json'
//     }
//   });

const PORT = process.env.PORT || 5000;
const debug = Debug('app');
const app = express();
const sessionRouter = express.Router();


app.use(morgan('tiny'));
app.use(express.static('public'));

app.set('views','./src/views');
app.set('view engine','ejs');


sessionRouter.route('/')
.get((req,res) => {
    res.render('sessions',{
        sessions,
    });
});
sessionRouter.route('/1')
.get((req,res)=>{
    res.send('hello single session')
});

app.use('/sessions',sessionRouter);

app.get('/', (req,res)=>{
    res.render('index',{title:'Globomantics', data:['a','b','c']});
});

app.listen(5000,()=>{
    debug(`Listening on port  ${chalk.green(PORT)}`);
});