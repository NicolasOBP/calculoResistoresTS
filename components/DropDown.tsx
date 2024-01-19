import { View, Text, ViewStyle, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "../globalstyles/dropdow";
import { AntDesign } from "@expo/vector-icons";

interface Props<T> extends ViewStyle {
  setC: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  data: T[] | undefined;
  renderItem: React.FC<{ item: T }>;
  onSelect: (item: T | string) => void;
  value: string | undefined;
  label: string;
  clean: () => void
}

export default function DropDown<T>({
  setC,
  data,
  placeholder,
  onSelect,
  value,
  renderItem,
  label,
  clean,
  ...rest
}: Props<T>) {
  const [ShowData, setShowData] = useState(false);

  const seleciona = (item: T | string) => {
    onSelect(item);
    setShowData(false);
  };

  function del() {
    clean()
    setC("black");
  }

  return (
    <View style={{ width: "80%", marginBottom: 10 }}>
      <Text style={{ fontWeight: "bold", left: 10 }}>{label}</Text>
      <View style={styles.container}>
        <Pressable
          style={styles.selecBtn}
          onPress={() => setShowData((old) => !old)}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Text style={styles.placeholder}>{value || placeholder}</Text>
            <View style={{ flexDirection: "row" }}>
              {value ? (
                <AntDesign
                  testID="delete"
                  name="closecircle"
                  size={20}
                  color="red"
                  onPress={del}
                />
              ) : (
                <></>
              )}
              <AntDesign
                testID="arrowIcon"
                name={ShowData ? "up" : "down"}
                size={20}
              />
            </View>
          </View>

          {ShowData && data && data.length > 0 && (
            <ScrollView style={{ height: 70, overflow: "hidden" }}>
              {data.map((item, index) => (
                <Pressable
                  android_ripple={{ color: "blue", radius: 150 }}
                  key={index}
                  style={styles.item}
                  onPress={() => seleciona(item)}
                >
                  {renderItem({ item })}
                </Pressable>
              ))}
            </ScrollView>
          )}
        </Pressable>
      </View>
    </View>
  );
}
