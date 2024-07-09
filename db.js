const mongoose = require('mongoose')

const connect = async () => {
    try{
        mongoose.connect('mongodb://127.0.0.1:27017/students')
        console.log("PASSED")
    }
    catch(err) { 
        console.log(err)
    }
    ;
}

const student_schema = new mongoose.Schema({
        roll_number: String,
        name: String,
        degree: String,
        city: String
    },
    {
        collection: 'student'
    }
)//explicitly pluralizes the name, so explicitly write 'student'. THIS IS WEIRD


//on compiling model, we get its instance - a document
const Student = mongoose.model("student", student_schema)

const get_students = async() => {
    const result =  await Student.find({}).exec()
    return result
}

const get_student = async(roll) => {
    const result = await Student.findOne({roll_number : roll})
    return result
}

const update_student = async(context) => {
    const new_data = {
        roll_number: context.roll_number,
        name: context.name,
        degree: context.degree,
        city: context.city
    }

    console.log(new_data)
    let res =  await Student.updateOne({roll_number: context.old_roll_number}, {$set : new_data}, {upsert: false, strict: false})
    console.log(res)
    return res
}

const add_student = async(student) => {
    return await new Student(student).save()
}

const remove_student = async(roll) => {
    return await Student.deleteOne({"roll_number" : roll})

}

module.exports = {connect, get_students, add_student, remove_student, update_student};