import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useState } from 'react';



type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Stock Plus</Text>
            <Text style={styles.subtitle}>Selecione uma opção</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('Produtos')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>📦 Produtos</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Categorias')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>🏷️ Categorias</Text>
            </TouchableOpacity>

            <StatusBar style="light" />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#541414",
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 16,
        color: "#D6CACA",
        marginBottom: 40,
    },

    button: {
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 20,

        // Android
        elevation: 5,

        // iOS
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    buttonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#541414",
    },
});