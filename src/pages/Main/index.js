import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  FlatList,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import logoImg from "../../assets/logo.jpg";
import userImg from "../../assets/Ellipse.png";

import styles from "./styles";

import api from "../../services/api";

import acaoImg from "../../assets/acao.png";
import expandImg from "../../assets/expand_more.svg";

export default function Main() {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [actions, setActions] = useState([]);

  const [loggedIdUser, setLoggedIdUser] = useState("");
  const [loggedNomeUser, setLoggedNomeUser] = useState("");
  const [loggedCargoUser, setLoggedCargoUser] = useState("");
  const [loggedTeamUser, setLoggedTeamUser] = useState("");
  const [loggedAmountRegis, setLoggedAmountRegis] = useState(0);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("loggedIdUser").then((idUser) => {
      if (idUser) {
        api.get(`users/${idUser}`).then((response) => {
          setLoggedIdUser(response.data[0].id_user);
          setLoggedNomeUser(response.data[0].nome_user);
          setLoggedCargoUser(response.data[0].cargo_user);
          setLoggedTeamUser(response.data[0].name_team);
          setLoggedAmountRegis(parseInt(response.data[0].count));
        });

        loadActions(idUser);
      }
    });
  }, []);

  async function loadActions(user) {
    if (loading) {
      return;
    }

    if (total > 0 && actions.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get("actions", {
      params: { user },
    });

    setActions([...actions, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Image source={userImg} />

        <View style={styles.userDetails}>
          <View style={styles.row}>
            <Text style={styles.userProperty}>Nome:</Text>
            <Text style={styles.userValue}>{loggedNomeUser}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.userProperty}>Cargo:</Text>
            <Text style={styles.userValue}>{loggedCargoUser}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.userProperty}>Equipe:</Text>
            <Text style={styles.userValue}>{loggedTeamUser}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.userProperty}>Número de registros:</Text>
            <Text style={styles.userValue}>{loggedAmountRegis}</Text>
          </View>
        </View>
      </View>

      <View style={styles.listContainer}>
        <Text style={{ fontSize: 24, alignSelf: "center" }}>
          Últimos registros
        </Text>

        <FlatList
          data={actions}
          style={styles.actionList}
          keyExtractor={(action) => String(action.id_action)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadActions}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={
            <View style={styles.emptyComponent}>
              <Text style={styles.textEmptyComponent}>
                Nenhum registro encontrado :(
              </Text>
            </View>
          }
          renderItem={({ item: action }) => (
            <View style={styles.action}>
              <View style={{ flexDirection: "row" }}>
                <Image style={styles.acaoImg} source={acaoImg} />

                <View style={styles.actionDetails}>
                  <Text style={styles.actionType}>{action.type_action}</Text>

                  <Text style={styles.actionValue}>{action.area_location}</Text>

                  <Text style={styles.actionValue}>
                    {new Date(action.date_action).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  justifyContent: "flex-end",
                  alignSelf: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#737380",
                  }}
                >
                  Enviado
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => {
          navigation.navigate("NewAction");
        }}
      >
        <Feather name="plus" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
