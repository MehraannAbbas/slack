const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const apps=  [
{id : 1 , name : 'Facebook' },
{id : 2 , name : 'Linkden' },
{id : 3 , name : 'Tiktok' },
{id : 4 , name : 'Twitter' }
];



app.get('/' , (req , res) =>{
res.send('Welcome To Slack!!!');
});


app.get('/api/apps' , (req , res) =>{
res.send(apps);
});



app.get('/api/apps/:id' , (req , res) => {
const app = apps.find(a=> a.id ===parseInt(req.params.id));
if(!app) res.status(404).send('The App With The Given ID was Not Found');
res.send(app);
});



app.post('/api/apps' , (req , res) =>{
const app = {
id : apps.length + 1 , 
name : req.body.name
};
apps.push(app);
res.send(app);
});



app.put('/api/apps/:id' , (req , res) =>{
    const app = apps.find(a=> a.id ===parseInt(req.params.id));
    if(!app) res.status(404).send('The App With The Given ID was Not Found');
    const {error} = validateApp(req.body);
    if (error) 
    return res.status(400).send(error.details[0].message);
    app.name =(req.body.name);
    res.send(app);
});




app.delete('/api/apps/:id' , (req , res) =>{
    const app = apps.find(a=> a.id ===parseInt(req.params.id));
    if(!app) res.status(404).send('The App With The Given ID was Not Found');
const index = apps.indexOf(app);
apps.splice(index , 1);
res.send(app);
});



function validateApp(app){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(app , schema);
}



app.listen(2500 , () => console.log('Listening on Port 2500...'));