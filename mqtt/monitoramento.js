import mqtt from 'mqtt';
import { salvandoDados} from './banco.js';

var client = mqtt.connect('mqtt://localhost:1883');
var topic = 'VOLUME_TANQUE'
var vazao = 'VALVULA_VAZAO'
var enviaDados = 'DADOS'
var tanque = 0;
var saida =0;
var obj = { 
    dados:[]
};

client.on('message', (topic, message)=> {
    message = message.toString();
    tanque += parseInt(message);
    if(tanque > 80){
        client.publish(vazao, '40')
        saida = 40;
    }else{
        saida = 0;
    }
    tanque -= saida;
    console.log('Volume do Tanque: ', tanque);
    salvandoDados(parseInt(message), saida, tanque);
    obj.dados.push({entrada:message, saida:saida, volume:tanque});
    client.publish(enviaDados, JSON.stringify(obj));
});

client.on('connect', () => {
    client.subscribe(topic);
});

