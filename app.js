import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import CsvReadableStream from "csv-reader";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import expressFileUpload from "express-fileupload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app=express();
const port=3000;

app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressFileUpload());
app.use(express.static("public"));



console.log(__dirname);





app.get("/",(req,res)=>{
    res.render("index.ejs");
});
let records=[];
app.post('/upload',async function(req, res) {
    console.log(req.files.foo); // the uploaded file object
    const file=req.files.foo;

    await file.mv(`${__dirname}/myFile.csv`);
    records=[];
    const inputStream = fs.createReadStream('myFile.csv', 'utf8');
    
    await inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
            records.push(row);
            console.log('A row arrived: ', row);
        })
        .on('end', function () {
            console.log('No more rows!');
        });

    console.log(records.length);
    res.render("show.ejs");

  });
app.get("/getD",(req,res)=>{
    console.log(records.length);
    res.render("upload.ejs",{
        data:records
    });
})

app.listen(port,()=>{
    console.log("sever is running on port 3000");
})

