// async function sendMessage() {
//   const message = await twilio.messages.create({
//     body: "Hello ",
//     from: "",
//     to: process.env.PHONE_NUMBER,
//   });

//   console.log(message);
// }

// sendMessage();

// require("dotenv").config();
// const express = require("express");
// const twilio = require("twilio");

// const app = express();
// const port = process.env.PORT || 3000;

// const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// app.use(express.json());

// app.post("/send-sms", async (req, res) => {
//   try {
//     const { message } = req.body;
//     if (!message) {
//       return res.status(400).json({ error: "Missing 'message' parameter" });
//     }

//     const sms = await client.messages.create({
//       body: message,
//       from: "+12084702523",
//       to: process.env.PHONE_NUMBER,
//     });

//     res.json({ success: true, sms });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

require("dotenv").config();
const express = require("express");
const twilio = require("twilio");

const app = express();
const port = process.env.PORT || 3000;

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

app.use(express.json());

app.post("/send-otp", async (req, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const message = `Your OTP code is: ${otp}`;

    const sms = await client.messages.create({
      body: message,
      from: process.env.ACCOUNT_PHONE_NUMBER,
      to: process.env.PHONE_NUMBER,
    });

    res.json({ success: true, otp }); // sms
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/send-sms", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Missing 'message' parameter" });
    }

    const sms = await client.messages.create({
      body: message,
      from: process.env.ACCOUNT_PHONE_NUMBER,
      to: process.env.PHONE_NUMBER,
    });

    res.json({ success: true, sms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/", (req, res) => {
  return res.status(200).json("My SMS and OTP API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
