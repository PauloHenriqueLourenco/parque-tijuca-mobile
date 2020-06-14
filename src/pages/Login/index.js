import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";

import logoImg from "../../assets/logo.jpg";

import styles from "./styles";

import api from "../../services/api";

export default function Login() {
  const navigation = useNavigation();
  const route = useRoute();

  const [login, setLogin] = useState();
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("login", {
        login: parseInt(login),
        password,
      });

      const { _id } = response.data;

      await AsyncStorage.setItem(
        "loggedIdUser",
        response.data.id_user.toString()
      );

      navigation.navigate("Main", { user: _id });
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} width={100} style={styles.image} />
        <Text style={{ fontSize: 24, textAlign: "center" }}>
          Sistema de Registro de Ações
        </Text>
      </View>

      <View style={styles.login}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#999"
          style={styles.input}
          placeholder="ID"
          value={login}
          onChangeText={setLogin}
        />

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#999"
          placeholder="Senha"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.entrar} onPress={handleLogin}>
          <Text>ENTRAR</Text>
        </TouchableOpacity>
      </View>

      {/* <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link> */}
    </View>
  );
}
