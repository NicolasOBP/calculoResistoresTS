import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, View } from "react-native";
import { styles } from "./globalstyles/style";
import React, { useState } from "react";
import img from "./assets/imgs/resistor.png";
import DropDown from "./components/DropDown";

export default function App() {
  const [cor, setCor] = useState("black");
  const [cor2, setCor2] = useState("black");
  const [cor3, setCor3] = useState("black");

  const [faixa1, setFaixa1] = useState<undefined | string>(undefined);
  const [faixa2, setFaixa2] = useState<undefined | string>(undefined);
  const [faixa3, setFaixa3] = useState<undefined | string>(undefined);

  const [prnum, setPrnum] = useState<string>("");
  const [segnum, setSegnum] = useState<string>("");
  const [multi, setMulti] = useState<number>(0);

  const [resistor, setResistor] = useState<number | string>();

  const faixas23 = [
    {
      res: "Preto",
      cor: "black",
      faixa: "0",
      multi: 1,
    },
    {
      res: "Marrom",
      cor: "brown",
      faixa: "1",
      multi: 10,
    },
    { res: "Vermelho", cor: "red", faixa: "2", multi: 100 },
    { res: "Laranja", cor: "orange", faixa: "3", multi: 1000 },
    { res: "Amarelo", cor: "yellow", faixa: "4", multi: 10000 },
    { res: "Verde", cor: "green", faixa: "5", multi: 100000 },
    {
      res: "Azul",
      cor: "blue",
      faixa: "6",
      multi: 1000000,
    },
    { res: "Violeta", cor: "purple", faixa: "7", multi: 1 },
    { res: "Cinza", cor: "gray", faixa: "8", multi: 1 },
    { res: "Branco", cor: "white", faixa: "9", multi: 1 },
  ];
  const faixas1 = [
    {
      res: "Marrom",
      cor: "brown",
      faixa: "1",
      multi: 10,
    },
    { res: "Vermelho", cor: "red", faixa: "2", multi: 100 },
    { res: "Laranja", cor: "orange", faixa: "3", multi: 1000 },
    { res: "Amarelo", cor: "yellow", faixa: "4", multi: 10000 },
    { res: "Verde", cor: "green", faixa: "5", multi: 100000 },
    {
      res: "Azul",
      cor: "blue",
      faixa: "6",
      multi: 1000000,
    },
    { res: "Violeta", cor: "purple", faixa: "7", multi: 1 },
    { res: "Cinza", cor: "gray", faixa: "8", multi: 1 },
    { res: "Branco", cor: "white", faixa: "9", multi: 1 },
  ];

  function cacl() {
    if (!faixa1 || !faixa2 || !faixa3) {
      alert("Por favor, insira todas as faixas");
    } else {
      let ver = 0;
      ver = Number(prnum + segnum) * multi;

      if (ver >= 1000) {
        setResistor(Intl.NumberFormat("pt-BR").format(ver / 1000) + " Kohm");
      } else {
        setResistor(ver + " ohm");
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.titulo}>
        <Text style={styles.textotitu}>Calculador de Resistor</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Image style={styles.img} source={img} />
        <View
          style={{
            left: 106,
            marginTop: 13,
            height: 75,
            width: 22,
            position: "absolute",
            backgroundColor: cor,
          }}
        ></View>
        <View
          style={{
            marginTop: 13,
            height: 75,
            width: 22,
            position: "absolute",
            left: 143,
            backgroundColor: cor2,
          }}
        ></View>
        <View
          style={{
            marginTop: 13,
            height: 75,
            width: 22,
            left: 180,
            position: "absolute",
            backgroundColor: cor3,
          }}
        ></View>
      </View>
      <DropDown
        setC={setCor}
        label="Priemira Faixa"
        data={faixas1}
        onSelect={(v) => {
          if (typeof v == "string") return;
          setFaixa1(v.res);
          setCor(v.cor);
          setPrnum(v.faixa);
        }}
        clean={() => setFaixa1('')}
        placeholder="Primeira Faixa do Resistor"
        renderItem={({ item }) => <Text>{item.res}</Text>}
        value={faixa1}
      />

      <DropDown
        setC={setCor2}
        label="Segunda Faixa"
        data={faixas23}
        onSelect={(v) => {
          if (typeof v == "string") return;
          setFaixa2(v.res);
          setCor2(v.cor);
          setSegnum(v.faixa);
        }}
        clean={() => setFaixa2('')}
        placeholder="Segunda Faixa do Resistor"
        renderItem={({ item }) => <Text>{item.res}</Text>}
        value={faixa2}
      />
      <DropDown
        setC={setCor3}
        label="Multiplicador"
        data={faixas23}
        onSelect={(v) => {
          if (typeof v == "string") return;
          setFaixa3(v.res);
          setCor3(v.cor);
          setMulti(v.multi);
        }}
        clean={() => setFaixa3('')}
        placeholder="Multiplicador do Resistor"
        renderItem={({ item }) => (
          <Text style={{ fontSize: 14 }}>{item.res}</Text>
        )}
        value={faixa3}
      />

      <View style={{ marginBottom: 40 }}>
        <Button title="Calcular" onPress={cacl} />
      </View>
      <View
        style={{ backgroundColor: "lightblue", padding: 10, borderRadius: 10 }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Valor do Resistor:
        </Text>
        {resistor ? (
          <Text style={{ fontSize: 18, textDecorationLine: "underline" }}>
            {resistor}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
