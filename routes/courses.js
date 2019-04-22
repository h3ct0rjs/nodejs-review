const Joi = require('joi');
const express = require('express');
const router = express.Router();

courses = [
    {id:1, name:'Bases de Datos' }, 
    {id:2, name:'Sistemas Operativos' }, 
    {id:3, name:'Seguridad de Sistemas' }, ]


router.get('/api/courses',(req, res)=>{
    return res.send(JSON.stringify(courses));
});

router.get('/api/courses/:id', (req, res) =>{
    // startDebug(req.params.id); //debug
    let course = courses.find(c=> c.id === parseInt(req.params.id));
    if (!course){
        return res.status(404).send('There is no that course id found in the database');
    }
    else{
        return res.status(200).send(course);
    }

});

router.post('/api/courses', (req, res) =>{
    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    else{    
        const coursex = {
            id: courses.length + 1, 
            name: req.body.name 
        }
        courses.push(coursex);
        res.send(JSON.stringify(courses));
    }
});

router.put('/api/courses/:id', (req, res) =>{
    let course = courses.find(c=> c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('There is no that course id found in the database');

    const {error} = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    course.name =  req.body.name;
    res.status(200).send(JSON.stringify(courses));
});

router.delete('/api/courses/:id', (req, res) => {
    let course = courses.find(c=> c.id === parseInt(req.params.id));
    if (!course)  return  res.status(404).send('There is no that course id found in the database');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(JSON.stringify(courses));

});

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };
    
    return Joi.validate(course, schema);
}

module.exports = router;