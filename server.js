const Express=require('express');
const app=new Express();

const Sequelize = require('sequelize');

global.connection = new Sequelize('d_jds', 'application', 's@myD#@mnl@sy', {
    host: '172.29.67.213',
    dialect: 'mysql'
    }, {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


app.use("/",(req,res,next)=>{
    connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        //console.log(connection);
        
        next();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

});

const port=process.env.PORT || 5868;

app.get('/social_interest',(req,res)=>{
    //console.log(connection);
    
    connection.query("SELECT product  FROM `tbl_display_product` ORDER BY product", {
        type: Sequelize.QueryTypes.SELECT
    })
    .then((result) => {
       // console.log(result);
       res.status(200).json({
           status: 200,
           msg: 'success',
           data: result
       });
        
    }).catch((err) => {
        console.log(err);
        
    });

});


app.listen(port,()=>console.log(`This server is running on port no ${port}`));