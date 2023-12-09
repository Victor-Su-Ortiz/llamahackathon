const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const zlib = require("zlib");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://vsuortiz:fNWbWncBjEBKHGx8@serverlessinstance0.vbq8qth.mongodb.net/?retryWrites=true&w=majority";

// Path to your compressed file
const compressedFilePath =
  "../data/2023-12_254_39B0_in-network-rates_1_of_9.json.gz";

// Decompress the .gz file
const decompressedData = zlib
  .gunzipSync(fs.readFileSync(compressedFilePath))
  .toString();

// Parse the decompressed data (assuming it's in JSON format)
const jsonData = JSON.parse(decompressedData);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
