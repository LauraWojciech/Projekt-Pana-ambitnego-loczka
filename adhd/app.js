/*import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

(async () => {
    const db = await open({
      filename: '/tmp/database.db',
      driver: sqlite3.cached.Database
    })
})()

async function run() {
    try {
      // Connect the client to the server
      const database = client.db("ADHDData");
      const usersCollection = database.collection("Users");
  
      // Create a new user document
      const newUser = {
        name: "John Doe",
        age: 30,
        email: "johndoe@example.com"
      };
  
      // Insert the user document
      const result = await usersCollection.insertOne(newUser);
      console.log(`New user created with the following id: ${result.insertedId}`);
  
      // Find all users in the collection
      const users = await usersCollection.find().toArray();
      console.log("Users in the collection:");
      console.log(users);
  
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  const express = require('express');
const app = express();


// Middleware
app.use(express.json());
app.use(express.static('public'));

// Serwer
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});

  
  run().catch(console.dir);

 */