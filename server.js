var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var db = mongojs("contactlist", ["contactlist"]);
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get("/", function (req, res) {});

app.get("/contactlist", function (req, res) {
  console.log("received get request");

  // person1 = {
  //   name: "John",
  //   email: "dsadsa@adsa.com",
  //   number: "(111) 111-1111",
  // };
  // person2 = {
  //   name: "John2",
  //   email: "dsadsa@adsa.com2",
  //   number: "(111) 111-1111",
  // };
  // person3 = {
  //   name: "John3",
  //   email: "dsadsa@adsa.com3",
  //   number: "(111) 111-1111",
  // };
  // person4 = {
  //   name: "John4",
  //   email: "dsadsa@adsa.com4",
  //   number: "(111) 111-1111",
  // };
  // person5 = {
  //   name: "John5",
  //   email: "dsadsa@adsa.com5",
  //   number: "(111) 111-1111",
  // };

  // var contactlist = [person1, person2, person3, person4, person5];
  var contactlist = db.contactlist.find(function (err, data) {
    console.log(data);
    res.json(data);
  });
});
app.post("/contactlist", function (req, res) {
  // var data = bodyParser.json(req.body);
  console.log(req.body);
  db.contactlist.insert(req.body, function (err, doc) {
    res.json(doc);
  });
});

app.delete("/contactlist/:id", function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
    res.json(doc);
  });
});

app.get("/contactlist/:id", function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
    res.json(doc);
  });
});

app.put("/contactlist/:id", function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify(
    {
      query: { _id: mongojs.ObjectId(id) },
      update: {
        $set: {
          name: req.body.name,
          email: req.body.email,
          number: req.body.number,
        },
      },
      new: true,
    },
    function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000, () => {
  console.log("Server started");
});

/*

var express = require('express')
var app = express()
var mongojs = require('mongojs')
var bodyParser = require('body-parser')
var db = mongojs('Employee',['contactlist'])

app.use(express.static(__dirname+"/public"))
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
    console.log("I received a GET request")
   
    db.contactlist.find(function (err, data){
        console.log(data)
        res.json(data)
    });
   

})


app.post('/contactlist', function(req, res){
    console.log(req.body)//server has to parse the data from the reques body

    db.contactlist.insert(req.body, function(err, doc){
        res.json(doc)
    })
})


app.delete('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })
})


app.get('/contactlist/:id', function(req, res){

    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })

});

app.put('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)}, 
        update:{$set:{name:req.body.name, email:req.body.email, number: req.body.number}},
        new:true}, function(err, doc){
            res.json(doc);
        }
    )
});

app.listen(3000);
console.log("Server running on port 3000")*/
