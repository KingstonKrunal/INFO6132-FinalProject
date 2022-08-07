import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import actionType from "../redux/actions/actionType";

const pData = require("../../data.json");

export default function Home({ navigation }) {
  const { data: cartData } = useSelector(state => state);

  const dispatch = useDispatch();
  const [data, setData] = useState(pData);

  const onLoadMoreData = () => {
    setData([...data, ...pData])
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: index % 2 === 0 ? "#E0E0E0" : "#F5F5F5" }]}
        onPress={() => navigation.navigate("Detail", { data: item })}
      >
        <View style={styles.rowStyle}>
          <Image style={styles.image} source={{ uri: item.Image }} />
          <View>
            <Text style={[styles.itemName]}>{item.name}</Text>
            <Text style={[styles.itemDescription]}>{item.description}</Text>
            <Text style={[styles.itemPrice]}>$ {item.price.toFixed(2)}</Text>
          </View>
          <Text style={[styles.buttonAdd]} onPress={() => {
            let index = cartData.findIndex(obj => obj.itemId === item.itemId)
            if (index === -1) {
              dispatch({
                type: actionType.ADD_DATA,
                payload: {
                  item: {
                    ...item,
                    quantity: 1
                  }
                },
              })
            } else {
              cartData[index].quantity = cartData[index].quantity + 1;
              dispatch({
                type: actionType.UPDATE_DATA,
                payload: { data: cartData },
              })
            }
          }}>ADD</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => renderItem(item, index)}
        // onEndReached={onLoadMoreData}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  itemContainer: {
    flex: 1,
    width: '100%',
    padding: 10
  },
  rowStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
  },
  itemName: {
    fontSize: 16,
    width: 150,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    width: 100,
    color: "#4C4556",
    marginTop: 10,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 10,
    width: 150,
    color: "grey",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  buttonAdd: {
    color: "#FFF",
    fontSize: 18,
    borderRadius: 10,
    fontWeight: "bold",
    padding: 5,
    backgroundColor: "#000",
  },
});
