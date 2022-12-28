const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app =express()
const mysql =require('mysql')

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Pazzw0rd@',
    database:'inventorydb'
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get',(req,res)=>{
    const sqlSELECT="SELECT * FROM inventorydb.serverinventory;";
    db.query(sqlSELECT,(err,result)=>{
        console.log(err)
        console.log(result)
        res.send(result)
    })
})
app.get('/api/getBySearch/:id',(req,res)=>{
    const sqlSELECT="SELECT * FROM inventorydb.serverinventory where id=?;";
    db.query(sqlSELECT,(err,result)=>{
        res.send(result)
    })
})

app.post('/api/insert',(req,res)=>{

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlInsert = "INSERT INTO inventorydb.serverinventory(movieName,movieReview) VALUES (?,?);"
    db.query(sqlInsert,[movieName,movieReview],(err,result)=>{
        console.log(result)
    })
})

app.listen(3001,()=>{
    console.log('running on port 3001')
})