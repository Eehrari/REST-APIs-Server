import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sample data for testing purposes
let secrets = [
  { id: 1, secret: "This is secret 1",age:33 },
  { id: 2, secret: "This is secret 2",age:55 },
];

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the secrets API");
});

// Get all secrets
app.get("/secrets", (req, res) => {
  res.json(secrets);
});

// Get a specific secret by ID
app.get("/secrets/:id", (req, res) => {
  const { id } = req.params;
  const secret = secrets.find((s) => s.id === parseInt(id));
  if (secret) {
    res.json(secret);
  } else {
    res.status(404).json({ error: "Secret not found" });
  }
});

// Add a new secret
app.post("/secrets", (req, res) => {
  const { secret,age } = req.body;
  const newSecret = { id: secrets.length + 1, secret, age };

  secrets.push(newSecret);
  res.status(201).json(newSecret);
});

// Update a secret by ID
app.put("/secrets/:id", (req, res) => {
  const { id } = req.params;
  const { secret,age } = req.body;
  const index = secrets.findIndex((s) => s.id === parseInt(id));
  if (index !== -1) {
    secrets[index].secret = secret;
    secrets[index].age = age;
    res.json(secrets[index]);
  } else {
    res.status(404).json({ error: "Secret not found" });
  }
});
// Update a secret by ID (PATCH)
app.patch("/secrets/:id", (req, res) => {
    const { id } = req.params;
    const { secret } = req.body;
    const index = secrets.findIndex((s) => s.id === parseInt(id));
    if (index !== -1) {
      secrets[index].secret = secret;
       res.json(secrets[index]);
    } else {
      res.status(404).json({ error: "Secret not found" });
    }
  });
  
// Delete a secret by ID
app.delete("/secrets/:id", (req, res) => {
  const { id } = req.params;
  const index = secrets.findIndex((s) => s.id === parseInt(id));
  if (index !== -1) {
    const deletedSecret = secrets.splice(index, 1)[0];
    res.json(deletedSecret);
  } else {
    res.status(404).json({ error: "Secret not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
