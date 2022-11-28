const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDoc = yamljs.load('./docs/swagger.yaml')

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

app.get('/courses/:id', (req, res) =>{
    if(typeof courses[req.params.id - 1 ] === "undefined"){
        return res.status(404).send({error: "Course not found"})
    }

    res.send(courses[req.params.id-1])
});

app.listen(port, () => {
console.log("listening on " + port.toString())
})