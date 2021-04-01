const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT || 5500;
const MongoClient = require('mongodb').MongoClient;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {

  const uri = process.env.URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  client.connect(err => {
    console.log(err)

    const collection = client.db("F1").collection("driver_data");

      collection.find({}).toArray() // returns the 1st promise
      .then( items => {
          // console.log('All items', items);
          res.render('index', {
            driverData: items,
            title: "F1 live data"
        })
      })
    });    
})

app.get('/follow/:id', (req, res) => {

  const votetype = req.query.votetype;


  const uri = process.env.URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  async function run() {
    try {
      await client.connect();

      const database = client.db("F1");
      const driverData = database.collection("driver_data");

      var ObjectId = require('mongodb').ObjectID;
      //The filter
      const filter = { "_id": ObjectId(req.params.id)};

      //Do not create a new document if filter does NOT find a match
      const options = { upsert: false };

      const updateFollow = {
        $set: {
          follow: votetype
        },
      };

      const result = await driverData.updateOne(filter, updateFollow, options);
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
    } finally {
      await client.close();

      if(!req.param('isAjax')){
        console.log('geen ajax');
        res.redirect('back');
      }else{
        console.log('wel ajax');
        res.sendStatus(200);
      }
    }
  }
  run().catch(console.dir);
})

app.get('/mydrivers', (req, res) => {

  const uri = process.env.URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  client.connect(err => {
    console.log(err)

    const collection = client.db("F1").collection("driver_data");

      collection.find({}).toArray() // returns the 1st promise
      .then( items => {
          // console.log('All items', items);
          res.render('mydrivers', {
            driverData: items,
            title: "F1 live data"
        })
      })
    });    
})

app.get('/admin', (req, res) => {

  const uri = process.env.URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    console.log(err)

    const collection = client.db("F1").collection("driver_data");

      collection.find({}).toArray() // returns the 1st promise
      .then( items => {
          // console.log('All items', items);

          res.render('admin', {
            driverData: items,
            title: "F1 admin"
        })
      })
    });    
})

app.get('/driverdata/:id', (req, res) => {

  const uri = process.env.URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  async function run() {
    try {
      await client.connect();

      const database = client.db("F1");
      const driverData = database.collection("driver_data");

      //The filter
      const filter = { driver_name: req.params.id};

      //Do not create a new document if filter does NOT find a match
      const options = { upsert: false };

      const updateDriverData = {
        $set: {
          position: req.query.position,
          tyre: req.query.tyre,
          lap_time: req.query.lap,
        },
      };

      const result = await driverData.updateOne(filter, updateDriverData, options);
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
})

app.get('/api/data', (req, res) => {

  const uri = "mongodb+srv://Jimmy:br8SfwNx8vnCXT9@cluster0.pjklp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    console.log(err)

    const collection = client.db("F1").collection("driver_data");

    collection.find({}).toArray() // returns the 1st promise
    .then( items => {
      return res.send(Object.values(items));
    })
  })
});    

// app.get('/test', (req, res) => {

//   const uri = "mongodb+srv://Jimmy:br8SfwNx8vnCXT9@cluster0.pjklp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   client.connect(err => {
//     console.log(err)

//     const collection = client.db("F1").collection("driver_data");
//     console.log(collection);


//     myobj = {
//       driver_name: 'New driver',
//       position: '4'
//     }

//     collection.insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       client.close();
//     });

//     return false
//   })
// });    





app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})