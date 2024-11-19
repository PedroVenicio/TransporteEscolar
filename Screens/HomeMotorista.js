import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Touchable } from 'react-native';

export default function HomeMotorista({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', {"periodo": "ida matutino"})}>
                <Text>Ida Matutino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', {"periodo": "volta matutino"})}>
                <Text>Volta Matutino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', {"periodo": "ida vespertino"})}>
                <Text>Ida Vespertino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', {"periodo": "volta vespertino"})}>
                <Text>Volta Vespertino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', {"periodo": "ida noturno"})}>
                <Text>Ida Noturno</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AlunosRota', {"periodo": "volta noturno"})}>
                <Text>Volta Noturno</Text>
            </TouchableOpacity>
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
      },
});