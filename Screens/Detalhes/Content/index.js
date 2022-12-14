import React from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { detalhes } from "./css/Styles";
import { useEffect, useState } from "react";
import { ipnode } from "../../../config/ip";

import { useDispatch } from "react-redux";
import { addItem, delItem } from "../../../redux/action/index";

export default function Content(props) {
  const { codigo } = props;

  const [carregando, setcarregando] = useState(true);

  const [carrinhoBtn, setCarrinhoBtn] = useState("Adicionar ao carrinho");

  const [produtos, setProdutos] = useState({
    codigo: "",
    produto: "",
    descricao: "",
    categoria: "",
    tamanho: "",
    venda: "",
    foto1: "",
    foto2: "",
    foto3: "",
    foto4: "",
  });

  useEffect(() => {
    fetch(`${ipnode}/api/produtos/listar/${codigo}`)
      .then((response) => response.json())
      .then((rs) => {
        setProdutos(rs.output[0]);
        setcarregando(false);
      })
      .catch((erro) => console.error(`Erro ao executar a api -> ${erro}`));
  }, []);

  const dispatch = useDispatch();

  const handleCart = (product) => {
    if (carrinhoBtn === "Adicionar ao carrinho") {
      dispatch(addItem(product));
      setCarrinhoBtn("Remover do carrinho");
    } else {
      dispatch(delItem(product));
      setCarrinhoBtn("Adicionar ao carrinho");
    }
  };

  return (
    <View style={detalhes.teladetalhes}>
      {carregando ? (
        <ActivityIndicator size={100} color={"#0c0031"} />
      ) : (
        <View>
          <Text style={detalhes.categoria}>
            Categoria: {produtos.categoria}{" "}
          </Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={detalhes.scrollview}
          >
            <Image
              source={{ uri: `${produtos.foto1}` }}
              style={detalhes.roupa}
            />
            <Image
              source={{ uri: `${produtos.foto2}` }}
              style={detalhes.roupa}
            />
            <Image
              source={{ uri: `${produtos.foto3}` }}
              style={detalhes.roupa}
            />
            <Image
              source={{ uri: `${produtos.foto4}` }}
              style={detalhes.roupa}
            />
          </ScrollView>

          <Text style={detalhes.nomeroupa}>{produtos.produto} </Text>
          <Text style={detalhes.tamanho}>{produtos.tamanho} </Text>
          <Text style={detalhes.descricao}>{produtos.descricao} </Text>
          <Text style={detalhes.precoroupa}>R$: {produtos.venda} </Text>
          <Pressable
            style={detalhes.btnadicionar}
            onPress={() => handleCart(product)}
          >
            {carrinhoBtn}

            <Text style={detalhes.txtadicionar}> Adicionar ao Carrinho </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
