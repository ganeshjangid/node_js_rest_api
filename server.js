const Express=require('express');
const app=new Express();

const port=process.env.PORT || 5868;


app.get('/hello',(req,res)=>{
    res.send("Hello world");
});


app.listen(port,()=>console.log(`This server is running on port no ${port}`));