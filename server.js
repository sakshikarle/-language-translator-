const express = require("express");
const translate = require("translate-google");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/translate", async (req, res) => {
    try {
        const { text, source, target } = req.body;

        const translatedText = await translate(text, {
            from: source,
            to: target
        });

        res.json({ translatedText });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Translation Failed"
        });
    }
});
app.get("/", (req, res) => {
    res.send("Server Working");
});
app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});