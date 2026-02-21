const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/orders", async (req, res) => {
  try {
    const response = await axios.get("http://user-service:3001/users");

    res.json({
      message: "Order service is running",
      users: response.data
    });

  } catch (error) {
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

if (require.main === module) {
  app.listen(3002, () => {
    console.log("Order service running on port 3002");
  });
}

module.exports = app;
