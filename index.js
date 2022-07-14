const express =  require ("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const { result } = require("lodash");
const { rmSync } = require("fs");
const { render } = require("ejs");
const { title } = require("process");
const blogRoutes = require("./routes/blogRoutes");
// express app

const app = express();

//connect to mongodb
const dbURI = "mongodb://localhost:27017/nodeproject" 
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result) =>app.listen(3010) )
.catch((err)=> console.log(err));


// register view engine 
app.set("view engine", "ejs");

// listen for request 


app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));

// // mongoose and mongo sandbox routes

// app.get("/add-blog", (req,res) => {
//     const blog = new Blog({
//         title:"new blog 2",
//         snippet:"about my new blog 2",
//         body:"more about my new blog"
//     });
//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// })

// app.get("/all-blogs", (req,res)=>{
//     Blog.find()
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err)=> {
//         console.log(err);
//     });
   
// })

// app.get("/single-blog",(req,res)=> {
//     Blog.findById("62cff698d1d8c8bd72f8aefd")
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=> {
//         console.log(err);
//     });
// })



// routes 
app.get("/", (req,res) => {
    res.redirect("/blogs");

});


app.get("/about", (req,res) => {
    // res.send("about");
    res.render("about", {title:"about"});

});

//blogs routes
app.use("/blogs",blogRoutes);

 // 404 page
app.use((req,res) => {
res.render("404", {title:"404"});
});

