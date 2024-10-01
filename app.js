import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/random-cocktail", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const cocktail = result.data.drinks[0];
    res.render("cocktail.ejs", { cocktail });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
