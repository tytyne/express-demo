const joi = require('joi');
const express=require('express');
const app=express();
app.use(express.json());
const courses=[
    //courses objects
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
];
//how to define a router or a router handler
app.get('/',(req,res)=>{
    res.send('hello flora');
});
app.get('/api/courses',(req,res) => {
res.send(courses);
});

app.post('/api/courses',(req,res)=>{
    
const {error} = validateCourse(req.body);//result.error
if(error){
    //400 bad request
    res.status(400).send(result.error.details[0].message);
    return;
}
//update 
const course={
    id:courses.length + 1,
    name:req.body.name
};
courses.push(course);
res.send(course); 
});

app.put('/api/courses/:id', (req,res) => {
    //look up the course
  const course=courses.find(c=>c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('the course with this given id is not found');
  //validation
 
const {error} = validateCourse(req.body);//result.error
if(error){
    //400 bad request
    res.status(400).send(result.error.details[0].message);
    return;
}
//update course
course.name=req.body.name;
//return updated course

  res.send(course);

});

function validateCourse(course){

    const schema={
        name:joi.string().min(3).required()
    };
return joi.validate(course,schema);


    
}

app.delete('/api/courses/:id', (req,res) => {

//look up the course
const course=courses.find(c=>c.id === parseInt(req.params.id));
if (!course) res.status(404).send('the course with this given id is not found');

//delete
const index = courses.indexOf(course);
courses.splice(index, 1);
//response
res.send(course);

});
 
app.get('/api/courses/:id', (req,res) => {
    //this will return bolean
  const course=courses.find(c=>c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('the course with this given id is not found');
  res.send(course);

    });
//PORT (environment viable) 
const port=process.env.PORT||5000;
app.listen(port , () => console.log(`listening on port ...${port}..`));