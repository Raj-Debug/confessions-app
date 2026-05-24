
const express=require('express')
const app=express();
const fs = require('fs');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const confessionsPath = path.join(__dirname, "data", "confessions.json");
let confessions = JSON.parse(fs.readFileSync(confessionsPath));

app.get("/",(req,res)=>{
    res.render("front",{confessions})
})

app.post("/confessions",(req,res)=>{
     
    const conf = {
    id: confessions.length + 1,
    confession: req.body.confession,
    likes:0
};
    confessions.push(conf);
    fs.writeFileSync(confessionsPath,JSON.stringify(confessions));
    res.redirect("/");

})

app.post("/confessions/:id/like",(req,res)=>
{
         const id=parseInt(req.params.id);
         const conf=confessions.find(c=>c.id==id);
         if(conf)
         {
            conf.likes=(conf.likes||0)+1;
            fs.writeFileSync(confessionsPath,JSON.stringify(confessions));
         }
    res.redirect("/");
});

app.listen(3000);