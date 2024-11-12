// SOURCE : https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/
// https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const cors = require('cors');
// const mongoose = require('mongoose');
require('./models/models.js');


const app = express ();
app.use(express.json());
app.use(cors());

// mongoose.connect(process.env.DB_URL);

const usersRoutes = require('./routes/userRoute');
const questionnaireVraiOuFauxRoutes = require('./routes/questionnaireVraiOuFaux');

app.use('/users', usersRoutes);
app.use('/questionnaire-vrai-ou-faux', questionnaireVraiOuFauxRoutes);


app.get("/", (request, response) => {
    const status = {
        "message": "Connecté a l'api",
    };
    response.json(status);
});


const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "User API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/myApiDocs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});