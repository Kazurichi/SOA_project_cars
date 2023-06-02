const express = require("express")
const app = express()
app.set("port", 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const car=require("./routes/car")
const recall=require("./routes/recall")
const report=require("./routes/report")
const user=require("./routes/user")
const authorization=require("./routes/authorization")


app.use("/car",car);
app.use("/recall",recall);
app.use("/report",report);
app.use("/user",user);
app.use("/authorization",authorization);
app.get("/check",async(req,res)=>{
    return res.status(200).send(await Car.findAll());
});

app.listen(app.get("port"), () => {
    console.log(`Server started at http://localhost:${app.get("port")}`)
})

module.exports = app