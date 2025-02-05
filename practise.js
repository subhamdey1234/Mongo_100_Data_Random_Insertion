import mongoose from "mongoose";
import fs from "fs";
import { type } from "os";

const url="mongodb://localhost:27017/nodeA6";

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("MongoDB Server is connected Successfully...")).catch((err)=>{
console.log(err);

})

//schema
const trainerSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:4,maxlength:20},
    email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
    age: {type:Number,required:true,min:18,max:80},
    isActive: { type: Boolean, default: true },
  course: { type: [String], enum: ['MERN', 'Java', 'Python'], required: true }

});

const trainer=mongoose.model("Trainer",trainerSchema);

const courses=["MERN","Java","Python"];
const isActive=[true,false];
const names=["John", "Jane", "Mike", "Anna", "Tom", "Linda", "Steve", "Sophia", "Robert", "Emily", 
               "Chris", "Laura", "David", "Olivia", "Daniel", "Sarah", "James", "Isabella", "Matthew", "Zoe"];
  
const trainers=[];

for (let i = 0; i < 50; i++) {
    const randomname=names[Math.floor(Math.random()*names.length)]+Math.floor(Math.random() * 1000);
    const randomage=Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const randomemail=randomname.toLowerCase()+"@gmail.com";
    const randomisactive=isActive[Math.floor(Math.random*isActive.length)];
    const randomCourse = [courses[Math.floor(Math.random() * courses.length)]];

    trainers.push({
        name:randomname,
        age:randomage,
        email:randomemail,
        isActive:randomisactive,
        course:randomCourse
    });
}

trainer.insertMany(trainers).then(()=>{
    console.log("Inserted Successfully");
    
}).catch((err)=>{
console.log(err);

});

