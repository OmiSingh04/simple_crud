const express = require('express')
const bodyParser = require('body-parser');
const {update_student, remove_student, connect, get_students, add_student} = require('./db.js')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')

async function main(){

    await connect()
    app.get('/', (req, res) => {
        get_students().then(
            (students) => {
                res.render("index", {student : students})
            }
        )
    })

    
    app.get('/read', (req, res) => {
        get_students().then(
            (students) => {
                res.render("index", {student : students})
            }
        )
    })

    app.post('/create', (req, res) => {
        add_student(req.body)
        res.redirect("back")
    })
    
    app.post('/delete', (req, res) => {
        console.log(req.body)
        remove_student(req.body.roll_number).then(
            (val) => res.redirect("back")
        )
    })


    app.post('/update', (req, res) => {
        console.log(req.body)
        update_student(req.body).then(
            (val) => {
                console.log(val)
                res.redirect("/")
            }
        )
    })

    console.log("SET UP ROUTES")

    app.listen(6969)

}

main().catch(console.error);