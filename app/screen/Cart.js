import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import actionType from "../redux/actions/actionType";

export default function Cart({navigation}) {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state);

    const getFinalValue = () => {
        let tempData = [];
        data.map((item) => {
            tempData.push(item.quantity * item.price);
        });
        let totalValue = tempData.reduce((a, b) => a + b, 0);
        if (totalValue >= 100) {
            let total = (totalValue * 80) / 100;
            let deducted = totalValue - total;
            return {total, deducted, final: totalValue};
        } else if (totalValue >= 80) {
            let total = (totalValue * 85) / 100;
            let deducted = totalValue - total;
            return {total, deducted, final: totalValue};
        } else {
            let deducted = 0;
            let total = totalValue;
            return {total, deducted, final: totalValue};
        }
    };

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity
                style={[styles.itemContainer, {backgroundColor: index % 2 === 0 ? "#E0E0E0" : "#F5F5F5"}]}>

                <View style={styles.rowStyle}>
                    <Image style={styles.image} source={{uri: item.Image}}/>

                    <View>
                        <Text style={[styles.itemName]}>{item.name}</Text>
                        <Text style={[styles.itemDescription]}>{item.description}</Text>
                        <Text style={[styles.itemPrice]}>$ {item.price.toFixed(2)}</Text>
                    </View>

                    <Text style={[styles.buttonAdd]} onPress={() => {
                        data[index].quantity = data[index].quantity - 1;
                        dispatch({
                            type: actionType.UPDATE_DATA,
                            payload: {data},
                        })
                    }}>-</Text>

                    <Text style={[styles.buttonAdd]}>{item.quantity}</Text>

                    <Text style={[styles.buttonAdd]} onPress={() => {
                        data[index].quantity = data[index].quantity + 1;
                        dispatch({
                            type: actionType.UPDATE_DATA,
                            payload: {data},
                        })
                    }}>+</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data.filter((obj) => obj.quantity > 0)}
                renderItem={({item, index}) => renderItem(item, index)}
                showsVerticalScrollIndicator={false}
            />
            {
                data.length > 0 &&
                <>
                    <View>
                        <Text style={styles.labelAmount}>Total Amount : {getFinalValue().final}</Text>
                        <Text style={styles.labelAmount}>Total Discount : {getFinalValue().deducted}</Text>
                        <Text style={styles.labelAmount}>Final Amount: {getFinalValue().total}</Text>
                    </View>

                    <TouchableOpacity style={styles.btnStyle} onPress={() => {
                        alert(
                            `Added items purchased successfully 
                            \nPaid $${getFinalValue().total} 
                            \nDiscount: $${getFinalValue().deducted}`
                        );
                        dispatch({
                            type: actionType.REMOVE_DATA
                        })
                        navigation.goBack(null)
                    }}>
                        <Text style={styles.btnLabel}>Purchase</Text>
                    </TouchableOpacity>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        color: "#000",
        fontSize: 18,
        fontWeight: "bold"
    },
    labelAmount: {
        marginVertical: 5,
        fontSize: 18,
        fontWeight: "bold",
    },
    btnStyle: {
        alignSelf: 'center',
        height: 40,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 5,
        marginTop: 30,
    },
    btnLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'white'
    }
});
