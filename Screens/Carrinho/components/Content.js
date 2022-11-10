import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ipnode } from "../../../config/ip";
import { styles } from "../css/Styles";
import { useSelector, useDispatch } from "react-redux";
import { addItem, delItem } from "../../../redux/action/index";

export default function Content() {
  const state = useSelector((state) => state.addItem);
  const dispatch = useDispatch();

  const handleOpen = (item) => {
    dispatch(addItem(item));
  };
  const handleClose = (item) => {
    dispatch(delItem(item));
  };

  const cartItems = (cartItem) => {
    return (
      <View>
        <View key={cartItem.codigo}>
          <Image source={{ uri: `${cartItem.foto1}` }} />

          <Text>{cartItem.produto}</Text>

          <Text>
            {cartItem.qty} X R$ {cartItem.venda} = R$
            {cartItem.qty * cartItem.venda}
          </Text>

          <TouchableOpacity
            onPress={() => handleClose(cartItem)}
            style={styles.fecharpedido}
          >
            <Text style={styles.txtfecharpedido}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleOpen(cartItem)}
            style={styles.fecharpedido}
          >
            <Text style={styles.txtfecharpedido}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const emptyCart = () => {
    return (
      <View>
        <Text>Seu carrinho está vazio</Text>
      </View>
    );
  };

  const buttons = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => alert("Fechar")}
          style={styles.fecharpedido}
        >
          <Text style={styles.txtfecharpedido}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && buttons()}
    </View>
  );
}
