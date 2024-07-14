const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 8000;


// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iynsonj.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    
    const signupCollection = client.db("LifeMateDoctorDB").collection("userSignup");


// signup api

    app.post('/signup', async(req,res)=>{
      
        
        const userInfo = req.body;

        console.log('user info is create',userInfo);

        const result = await signupCollection.insertOne(userInfo);
        res.send(result);

    })

  app.get('/signup/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
     

    if (!query._id) {
      return res.status(400).send({ error: 'Invalid ID format' });
    }
   
    const result = await signupCollection.findOne(query);

    res.send(result);

  })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Life line server is running in the port')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })