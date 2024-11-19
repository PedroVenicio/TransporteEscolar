import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Touchable } from 'react-native';

export default function AlunosRota({ navigation, route }) {
    const {periodo} = route.params;

    return (
        <View style={styles.container}>
            <Text>Rota {periodo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }
});