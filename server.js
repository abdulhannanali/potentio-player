const express = require("express")
const http = require("http")

const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "0.0.0.0"

const io = require("./io/socket.js")(server)
const board = require("./arduino/arduino")(io)

app.use("/", express.static(__dirname + "/public"))

server.listen(PORT, HOST, function (error) {
	if (!error) {
		console.log(`Server is listening on PORT=${PORT} HOST=${HOST}`)
	}
})