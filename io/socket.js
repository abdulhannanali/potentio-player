const socketIO = require("socket.io")


module.exports = function (server) {
	var io = socketIO(server)

	if (!server) {
		throw new Error("server instance not provided!")
	}

	io.sendPot = function (value) {
		var numVal = parseInt(value)

		if (numVal) {
			io.emit("pot", numVal)
		}

	}

	return io
}