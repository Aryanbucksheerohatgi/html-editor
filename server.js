const { defaultMaxListeners } = require("events");
var express= require("express")
var app = express();
var fs = require("fs")
var randomString = require('randomstring')
app.use(express.json())

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
    
})

app.get("/display/:id", (req, res)=>{
    console.log("Display route")
    res.sendFile(__dirname+ "/"+ req.params.id+".html");
    setTimeout(()=>{  fs.unlink(req.params.id+".html",(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("file deleted succefully")
        }

    })}, 5000)
  
})

app.post("/code",(req,res)=>{
    let code = req.body.code; 
    let filename = randomString.generate(7) 
    fs.writeFile(filename+".html",code,(err)=>{
        if(err){
            console.log(err)
    
        }
        else{
            console.log("File has been created successfully")
            res.json({link: filename})
        }
    })
    console.log(filename);
    console.log(code);



})

app.listen(3000,(err)=>{
if(err){
    console.log(err)
  

}
else{
    console.log("server is running")
        
}
})