const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000
const cors = require('cors');

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kqyf4iv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const usersCollaction = client.db('users-management').collection('users');

async function run() {
  try {
    // user create
    app.post('/users', async (req,res) => {
      const userData = req.body;
      const result = await usersCollaction.insertOne(userData);
      res.send(result);
    })
    // users find
    app.get('/users', async (req,res) => {
      const result = await usersCollaction.find().toArray()
      res.send(result)
    })
    // users findOne
    app.get('/users/:id', async (req,res) => {
      const {id} = req.params;
      const filter = {_id : new ObjectId(id)}
      const result = await usersCollaction.findOne(filter);
      res.send(result)
    })

    // user put / update
    app.put('/users/:id', async (req,res) => {
      const {id} = req.params;
      const filter = {_id : new ObjectId(id)};
      const options = { upsert: true };
      const updateData = req.body;
      const updateDoc = {
        $set: updateData
      }
      const result = await usersCollaction.updateOne(filter,updateDoc,options)
      res.send(result);
    })
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/',(req,res) => {
    res.send('user management')
})

app.listen(port, () => {
    console.log(`port running ${port}`)
})

// uJtQC5ShwXx7SFqt
// user-management