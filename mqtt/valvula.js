import mqtt from "mqtt";

var client = mqtt.connect('mqtt://localhost:1883');
var topic = 'VALVULA_VAZAO'

client.on('message', (topic, message)=> {
    message = message.toString();
    console.log('Vazão do tanque: ', message)
})

client.on('connect', () => {
    client.subscribe(topic);
})
