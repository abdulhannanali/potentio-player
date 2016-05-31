var five = require("johnny-five"), potentiometer;

var board = new five.Board()

module.exports = function (io) {
	if (!io) {
		throw new Error("Socket.IO instance not provided!")
	}

	board.on("ready", function () {
		potentiometer = new five.Sensor({
			pin: "A4",
			freq: 1000
		})

		board.repl.inject({
			pot: potentiometer
		})

		potentiometer.on("data", function () {
			io.sendPot(this.raw)		
		})
	})
}