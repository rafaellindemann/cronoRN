import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;
export default function App() {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('VAI');
  const [ultimo, setUltimo] = useState(null);
  function vai(){
    if(timer !== null){
      clearInterval(timer); // parar o timer
      timer = null;
      setBotao('VAI');
    }else{
      // começa a girar o timer
      timer = setInterval(() => {
        ss++; 
        if(ss == 60){
          ss = 0 ;
          mm++;
        }
        if(mm == 60){
          mm = 0 ;
          hh++;
        }

        let format = 
        (hh < 10 ? '0'+hh : hh) + ':' +
        (mm < 10 ? '0'+mm : mm) + ':' +
        (ss < 10 ? '0'+ss : ss)

        setNumero(format)
      }, 1000);
      setBotao('PARAR')
    }
  }

  function limpar(){
    if(timer !== null){
      //parar o timer
      clearInterval(timer);
      timer = null;
    }
    setUltimo(numero);
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('VAI');
  }
  return (
    <View style={styles.container}>
      
      <Image 
        source={require('./src/crono.png')}
      />

      <Text style={styles.timer}> {numero} </Text>
      <View style={styles.btnArea}>
        <Pressable style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </Pressable>
      </View>
      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {
            ultimo ? 'Último tempo: ' + ultimo : ''
          }
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto:{
    fontSize: 20,
    fontWeight: 'bold', 
    color: '#00aeef'
  },
  areaUltima:{
    marginTop: 40,
  },
  textoCorrida: {
    fontSize:25,
    color: '#fff',
    fontStyle: 'italic',
  },
});
