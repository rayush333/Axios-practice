const express=require('express');
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const mongoose=require('mongoose');
const cors=require("cors");
app.use(cors());
mongoose.connect("mongodb://localhost:27017/usersDB",{useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true},function(err){
    if(err)
    console.log(err);
});
const usersSchema=new mongoose.Schema({
    _id: Number,
    name: String,
    username: String,
    email: String,
    phone: String,
    website: String
});
const samples=[{_id: 1,name: "ayush",username: 'rayush',email: "ray@gmail.com",phone:"838484",website:'ray.com'},
{_id: 2,name: "babu",username: 'babus',email: "babu@gmail.com",phone:"84428",website:'babu.com'},
{_id: 3,name: "pullu",username: 'pullus',email: "pullu@gmail.com",phone:"34735",website:'pullu.com'}];
const User = mongoose.model("User",usersSchema);
User.find({},function(err,users){
    if(err)
    console.log(err);
    else
    {
        if(users.length===0){
            samples.forEach(function(sample){
                const newuser=new User(sample);
                newuser.save();
            });
        }
    }
});
app.get("/users",function(req,res){
    User.find({},function(err,users){
        if(err)
        console.log(err);
        else
        res.send(users);
    })
});
app.get("/users/:id",function(req,res){
    const id=req.params.id;
    User.find({_id: id},function(err,user){
        if(err)
        console.log(err);
        else res.send(user);
    });
});
app.post("/users",function(req,res){

    const newuser=new User(req.body);
    newuser.save(function(err){
        if(err)
        console.log(err);
        else
        res.redirect("/users");
    });
});
app.delete("/users/:id",function(req,res){
    const id=req.params.id;
    User.deleteOne({_id: id},function(err){
        if(err)
        console.log(err);
        else
        res.redirect("/users");
    });
});
app.delete("/users",function(req,res){
    User.deleteMany({},function(err){
        if(err)
        console.log(err);
        else
        res.redirect("/users");
    });
});
app.put("/users/:id",function(req,res){
    User.replaceOne({_id: req.params.id},req.body,function(err){
        if(err)
        console.log(err);
        else
        res.redirect("/users");
    });
});
app.patch("/users/:id",function(req,res){
    User.updateOne({_id: req.params.id},req.body,function(err){
        if(err)
        console.log(err);
        else
        res.redirect("/users");
    });
});
app.listen(process.env.PORT || 5000,function(){
    console.log("Server running on port 5000");
});
