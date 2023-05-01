import type { NextApiRequest, NextApiResponse } from 'next';
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGODB_PASSWORD}@rentingapp.h4bql7y.mongodb.net/?retryWrites=true&w=majority`;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

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
      await client.connect();
      switch (method) {
        case 'GET':
          // Fetch cars from the database and return them as JSON.
          const db = client.db("Renting");
          const collection = db.collection("Cars");
          const cars = await collection.find({}).toArray();
          res.status(200).json(cars);
          break;
    
        // Implement other cases (POST, PUT, DELETE) here.
    
        default:
          res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
          res.status(405).end(`Method ${method} Not Allowed`);
      }
      console.log("Data, you successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

}
