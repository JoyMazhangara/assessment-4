const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortunes = ["A beautiful, smart, and loving person will be coming into your life.",
					 "A lifetime friend shall soon be made",
					 "A smile is your personal welcome mat",
           "All your hard work will soon pay off",
           "Allow compassion to guide your decisions"
  ];

  // choose random fortune
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
  
});

const ctrl = require('./controller');
const { getVisions, deleteVision, createVision, updateVision} = ctrl
 
app.get('/api/visions', getVisions)
app.delete('/api/visions/:id', deleteVision)
app.post('/api/visions', createVision)
app.put('/api/visions/:id', updateVision)

app.listen(4000, () => console.log("Server running on 4000"));
