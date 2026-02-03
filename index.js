// // 2-2-2026
// // ex-1  put -->thunder client url-->http://localhost:3001/putUsers/4
// let exp = require("express");
// let app = exp();
// let port = 3001;
// let fs = require("fs");
// let data = require("./employee.json");
// app.use(exp.json());
// // get data
// app.get("/users", (req, res) => {
//   res.send(data);
// });
// // put
// app.put("/putUsers/:id", (req, res) => {
//   let getId = parseInt(req.params.id);
// //   console.log(getId);

//   let getNewObj = req.body;
//   // to  get old user picked obj index
//   let getOldObjIndex = data.findIndex((i) => i.id == getId);
//   console.log("ID", getOldObjIndex);
//   if (getOldObjIndex !== -1) {
//     data[getOldObjIndex] = { ...data[getOldObjIndex], ...getNewObj };
//     fs.writeFileSync("./employee.json", JSON.stringify(data));
//     res.send(data)
//   }
// });
// app.listen(port, (req, res) => {
//   console.log("server : http://localhost:" + port + "/users");
//   console.log("thunder client link : http://localhost:3001/putUsers/1");
  
// });




// ex-2)same to  ex-1 ,get,post  ---->minor project/task-->express js crud operations
//  put -->thunder client url-->http://localhost:3001/putUsers/4
let exp = require("express");
let app = exp();
let cors=require('cors')
let port = process.env.port || 3001;
let fs = require("fs");
let data = require("./employee.json");
app.use(cors())
app.use(exp.json());
app.use(exp.urlencoded({extended: true}));
// get data
app.get("/users", (req, res) => {
  res.send(data);
});


// post the data
app.post('/postUsers',(req,res)=>{
    let id=data.length+1
    let NewPostObj=req.body
    console.log(req);

    // NewPostObj['id']=id
    // or
    NewPostObj={id, ...NewPostObj}

    data.push(NewPostObj)
    fs.writeFileSync('./employee.json',JSON.stringify(data))
    res.send(data)
})

// delete the data
// in id name place we can use any name and entile function use that name only.
app.delete('/deleteUser/:id',(req,res)=>{
    let id=parseInt(req.params.id)
    let filterData=data.filter(i=>i.id!=id)
    fs.writeFileSync('./employee.json',JSON.stringify(filterData))
    res.send(filterData)
})

// update users -->put users
// put
app.put("/putUsers/:id", (req, res) => {
  let getId = parseInt(req.params.id);
//   console.log(getId);
  let getNewObj = req.body;
  let getOldObjIndex = data.findIndex((i) => i.id == getId);
  if (getOldObjIndex !== -1) {
    data[getOldObjIndex] = { ...data[getOldObjIndex], ...getNewObj };
    fs.writeFileSync("./employee.json", JSON.stringify(data));
    res.send(data)
  }
});

app.listen(port, (req, res) => {
  console.log("server get link: http://localhost:" + port + "/users");
  console.log("thunder client/html Put link : http://localhost:3001/putUsers/1");
  console.log("thunder client/html Post link : http://localhost:3001/postUsers");
  console.log("thunder client/html delete link: http://localhost:3001/deleteUser");  
});
