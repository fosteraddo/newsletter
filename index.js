const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const collection = require("./mongodb")
const port = 3000;

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("public"))


app.get("/", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/login", (req, res) => {
    res.render("login")
})


// app.post("/signup", async (req, res) => {
app.post("/signup", (req, res) => {
    const data = {
        name: req.body.name, 
        password: req.body.password
    }

    // await collection.insertMany([data])
     collection.insertMany([data])
     console.log("Successfully saved user data to mongodb")
    res.render("home")
})

// app.post("/login", async function(req, res){
app.post("/login", function(req, res){

    try{
        // const check = await collection.findOne({name: req.body.name})
        const check = collection.findOne({name: req.body.name})

        if(check.password === req.body.password){
            res.render("home")
            console.log("Password matched")
        }else{
            res.send("Wrong password")
            console.log("password does note match")
        }
    }catch{
        res.send("Wrong details")
    }

})

app.listen(port, function(){
    console.log(`Server is running on port ${port}`)
})