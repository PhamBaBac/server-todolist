import express from "express";
import { JWT } from "google-auth-library";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3001;

app.post("/get-accesstoken", (req, res) => {
  const body = req.body;
  const { email, key } = body;
  console.log("body", body);
  new Promise(() => {
    const client = new JWT(
      email,
      null,
      key,
      ["https://www.googleapis.com/auth/cloud-platform"],
      null
    );

    client.authorize((err, tokens) => {
      if (err) {
        console.log("Error", err);
        throw new Error(err);
      }
      res.status(200).json({ message: "Success", data: tokens });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server starting at http://localhost:${PORT}`);
});
