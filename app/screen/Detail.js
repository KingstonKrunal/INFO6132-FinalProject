import { StyleSheet, View } from 'react-native';
import { WebView } from "react-native-webview";
import { useRoute } from '@react-navigation/native';

export default function Detail() {
    const route = useRoute();
    return (
        <View style={styles.container}>
            <WebView
                style={styles.viewContainer}
                source={{
                    html: `<html><body><div><img style="height: 550px; width: 100%;" src=${route.params.data.Image
                        } /><div><h1 style="float: left; font-size: 45px;">${route.params.data.name
                        }</h1><h1 style="float: right; margin-right: 60px; font-size: 45px;">$ ${route.params.data.price.toFixed(
                            2
                        )}</h1></div>
            <h1 style="position: absolute; top: 700px; font-size: 45px; width: 100%; margin-right: 150px;">${route.params.data.description
                        }</h1>
            <h1 style="position: absolute; top: 800px; font-size: 45px; width: 100%">Manufacturer: ${route.params.data.manufacturer
                        }</h1></div></body></html>`,
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    viewContainer: {
        width: "100%",
    },
});
