var app = require("express")();
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
mongoose.connect("mongodb://localhost/dataBlog");

var dataSchema = new mongoose.Schema({
  title:String,
  body:String
})

var Data = mongoose.model("todo",dataSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));


app.get("/",function(req,res){
  Data.find({},function(err,data){
    if(err){
      console.log("ERROR");
    }else{
      res.render("home",{data});
    }
  })
});

app.get("/delete/:id",function(req,res){
  Data.remove({_id:req.params.id},function(err,data){
    res.redirect("/");
  });
})

app.post("/data/update",function(req,res){
   const {id,title,body} = req.body;
   Data.update({_id:id},{title,body},function(err,data){
    if(err){
      console.log("ERROR",err);
    }else{
      res.redirect("/");
    }
   })
})

app.post("/data",function(req,res){
  Data.create({
    title:req.body.title,
    body:req.body.body
  });
  res.redirect("/");
})

app.get('/update/:id',function(req,res){
  const id = req.params.id;
  res.render("update",{id:id})
})

app.listen(3000,function(){
  console.log("Server is running!");
});