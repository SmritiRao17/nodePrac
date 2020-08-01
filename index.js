const express=require('express');
const Joi = require('joi');
const app = express();

app.use(express.json())

courses=[
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
    {id:4, name: 'course4'},
    {id:17, name: 'course17'},
]

app.get('/',(req,res)=>{
    res.send('Hello World Welcome')
})

app.get('/api/courses',(req,res)=>{
    res.send(courses)
})

//route param

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id=== parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with given id not found')
    res.send(course)
})

//query params

app.get('/api/courses/:year/:month',(req,res)=>{
    res.send(req.query)
})

app.post('/api/courses/',(req,res)=>{
const schema={
    name:Joi.string().min(3).required()
}
const result= Joi.validate(req.body,schema);
if(result.error) return res.status(400).send(result.error.details[0].message)
    const course={
        id: courses.length+1,
        name: req.body.name
    }

    courses.push(course)
    res.send(courses)
})

app.put('/api/courses/:id',(req,res)=>{
    //look up for the course
    const course = courses.find(c=>c.id=== parseInt(req.params.id))
    console.log('put course',course)
    //if not existing return 404
    if(!course) return res.status(404).send('The course with given id not found')
    
    //validate
    const schema={
        name:Joi.string().min(3).required()
    }
    const result= Joi.validate(req.body,schema);

    //400 not valid data
    if(result.error)
        return res.status(400).send(result.error.details[0].message)
    //update course
    course.name=req.body.name;
    //return updated coure
    res.send(courses)
})

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id=== parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with given id not found')
    const position= courses.indexOf(course)
    courses.splice(position,1)
    res.send(courses)
 
})
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})

