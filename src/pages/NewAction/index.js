import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import RNPickerSelect from "react-native-picker-select";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import fotoContent from "../../assets/foto-content.png";
import logoImg from "../../assets/logo.jpg";

import api from "../../services/api";
import styles from "./styles";

export default function NewAction() {
  const navigation = useNavigation();
  const [typesAction, setTypesAction] = useState([]);
  const [typesTrail, setTypesTrail] = useState([]);

  const [sector, setSector] = useState("");
  const [area, setArea] = useState("");
  const [peoples, setPeoples] = useState("");
  const [typeTrail, setTypeTrail] = useState({});
  const [typeAction, setTypeAction] = useState({});
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  const [description, setDescription] = useState("");

  const [loggedIdUser, setLoggedIdUser] = useState("");
  const [loggedRegisUser, setLoggedRegisUser] = useState("");
  const [loggedNomeUser, setLoggedNomeUser] = useState("");
  const [loggedCargoUser, setLoggedCargoUser] = useState("");
  const [loggedTeamUser, setLoggedTeamUser] = useState("");
  const [loggedAmountRegis, setLoggedAmountRegis] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("loggedIdUser").then((idUser) => {
      if (idUser) {
        api.get(`users/${idUser}`).then((response) => {
          setLoggedRegisUser(response.data[0].regis_user);
          setLoggedIdUser(response.data[0].id_user);
          setLoggedNomeUser(response.data[0].nome_user);
          setLoggedCargoUser(response.data[0].cargo_user);
          setLoggedTeamUser(response.data[0].name_team);
          setLoggedAmountRegis(parseInt(response.data[0].count));
        });
      }
    });
  }, []);

  useEffect(() => {
    api.get("type_action").then((response) => {
      setTypesAction(response.data);
    });

    api.get("type_trail").then((response) => {
      setTypesTrail(response.data);
    });
  }, []);

  const optionsTypesAction = typesAction.map((ta) => {
    return { value: ta.id_type_action, label: ta.description };
  });

  const optionsTypesTrail = typesTrail.map((tt) => {
    return { value: tt.id_type_trail, label: tt.description };
  });

  const optionsSectors = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];

  const optionsAmounts = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const optionsUnits = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  function navigateBack() {
    navigation.goBack();
  }

  async function handleNewAction() {
    console.log(sector);
    console.log(area);
    console.log(peoples);
    console.log(typeTrail);
    console.log(typeAction);
    console.log(amount);
    console.log(unit);
    console.log(description);
    console.log(loggedIdUser);

    try {
      const response = await api.post("actions", {
        sector_location: sector,
        area_location: area,
        date_action: new Date(),
        peoples_action: peoples,
        amount_action: amount,
        unit_action: unit,
        description_action: description,
        id_type_action: typeAction,
        id_type_trail: typeTrail,
        id_user: loggedIdUser,
      });

      navigation.navigate("Main");
    } catch (err) {
      alert("Falha na criação da ação, tente novamente.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          {/* <Image style={styles.logoImg} source={logoImg} /> */}

          <TouchableOpacity onPress={navigateBack}>
            <Feather name="arrow-left" size={28} color="#62ad84" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Image style={styles.fotoContent} source={fotoContent} />

          <View style={styles.userDetails}>
            <View style={styles.row}>
              <Text style={styles.userProperty}>Número do Registro:</Text>
              <Text style={styles.userValue}>{loggedRegisUser}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.userProperty}>Data:</Text>
              <Text style={styles.userValue}>
                {new Date().toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.userProperty}>Status:</Text>
              <Text style={styles.userValue}>Pendente</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.userProperty}>Responsável:</Text>
              <Text style={styles.userValue}>{loggedNomeUser}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.userProperty}>Equipe:</Text>
              <Text style={styles.userValue}>{loggedTeamUser}</Text>
            </View>
          </View>
        </View>

        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={{ label: "Selectione um setor" }}
          useNativeAndroidPickerStyle={false}
          items={optionsSectors}
          onValueChange={setSector}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
          }}
        />

        <TextInput
          placeholder="Área"
          style={styles.input}
          value={area}
          onChangeText={setArea}
        />

        <TextInput
          placeholder="Pessoal extra"
          style={styles.input}
          value={peoples}
          onChangeText={setPeoples}
        />

        <Text style={styles.title}>Ações</Text>
        <View className="select-action-container">
          <RNPickerSelect
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Manejo de trilha" }}
            items={optionsTypesAction}
            onValueChange={setTypeAction}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="gray" />;
            }}
          />
          <RNPickerSelect
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: "Selectione uma ação" }}
            items={optionsTypesTrail}
            onValueChange={setTypeTrail}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="gray" />;
            }}
          />

          <View className="select-amount-unit-container">
            <RNPickerSelect
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Quantidade" }}
              items={optionsAmounts}
              onValueChange={setAmount}
              Icon={() => {
                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
              }}
            />
            <RNPickerSelect
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Unidade" }}
              items={optionsUnits}
              onValueChange={setUnit}
              Icon={() => {
                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
              }}
            />
          </View>
        </View>

        <Text style={styles.title}>Descrição</Text>
        <TextInput
          style={styles.inputDescription}
          multiline={true}
          numberOfLines={10}
          onChangeText={setDescription}
        ></TextInput>

        <TouchableOpacity style={styles.sendButton} onPress={handleNewAction}>
          <Text>ENVIAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  inputAndroid: {
    height: 46,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});
