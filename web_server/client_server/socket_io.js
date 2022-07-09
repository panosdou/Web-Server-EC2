function EmitBattery(count) {
    socket.emit('message', count.toString())
    count = count + 1
    }

module.exports = EmitBattery