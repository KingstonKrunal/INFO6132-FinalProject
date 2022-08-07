import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../screen/Home';
import Detail from '../screen/Detail';
import Cart from '../screen/Cart';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation, route }) => ({
                        title: "Product",
                        headerTitleAlign: "center",
                        headerRight: () => (
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate("Cart")}
                            >
                                <Text style={styles.buttonText}>View Cart</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    options={{
                        title: "Product Details",
                        headerTitleAlign: "center",
                    }}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        title: "Cart",
                        headerTitleAlign: "center",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    button: {
        height: 30,
        width: 90,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold'
    },
});
