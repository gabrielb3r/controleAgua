import mqtt from 'mqtt';
var client = mqtt.connect('mqtt://localhost:1883')

var topic = 'VOLUME_TANQUE'

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, '20')
        console.log('Entrada no Tanque: ', '20')
    }, 1000)
})