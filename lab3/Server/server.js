const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");


app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../Client/Pages/main.html"));
})

app.post("/welcome.html", (req, res) => {
    const Name = req.body.Name;
    const MobileNumber = req.body.Mobile;
    const Address = req.body.Address;
    const Email = req.body.Email;

    fs.readFile(
        path.join(__dirname, "../Client/Pages/welcome.html"),
        "utf-8",
        (err, data) => {
            if (err) {
                console.error("Error:", err)
                return;
            }

            const welcomePage = data
                .replace("{Name}", Name)
                .replace("{Mobile}", MobileNumber)
                .replace("{address}", Address)
                .replace("{Email}", Email);

                res.send(welcomePage);
        }
    );
});

app.listen(PORT, ()=>{
    console.log("http://localhost/" + PORT)
});