const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./docs/swagger.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.listen(port, () => {
console.log("listening on " + port.toString())
})