const express = require('express')
const app = express()
// const PORT = process.env.PORT || 3000
// const path = require("path")

app.use(express.static('build'))
// app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./src/index.tsx"));
//   });
// }