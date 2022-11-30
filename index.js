const express = require('express')
const app = express()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDoc = yamljs.load('./docs/swagger.yaml')

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

const courses = [
    {id: 1, name: "Course name", price: 29.99},
    {id: 2, name: "Course name 2", price: 9.99},
    {id: 3, name: "Course name 3", price: 15.99},
    {id: 4, name: "Course name 4", price: 14.99},
    {id: 5, name: "Course name 5", price: 12.99},
    {id: 6, name: "Course name 6", price: 17.99},
    {id: 7, name: "Course name 7", price: 19.99},
    {id: 8, name: "Course name 8", price: 9.99}
]


app.get('/courses', (req, res) =>{
    res.send(courses)
});

app.delete('/courses/:id',(req,res) => {
    if(typeof courses[req.params.id - 1 ] === "undefined"){
        return res.status(404).send({error: "Course not found"})
    }

    courses.splice(req.params.id - 1,1)

    res.status(204).send({error:"No content"})
})

app.post('/courses',(req,res) => {
    if (!req.body.name || !req.body.price){
        return res.status(400).send({error: "One or all params are missing"})
    }
    let course = {
        id: courses.length+1,
        name: req.body.name,
        price: req.body.price
    }
    courses.push(course)

    res.status(201)
        .location(`${getBaseUrl(req)}/courses/${courses.length}`)
        .send(course)
})
function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http'+`://${req.headers.host}`
}


app.get('/courses/:id', (req, res) =>{
    if(typeof courses[req.params.id - 1 ] === "undefined"){
        return res.status(404).send({error: "Course not found"})
    }

    res.send(courses[req.params.id-1])
});


app.listen(port, () => {
console.log("listening on http://localhost:" + port.toString()+"/docs")
})