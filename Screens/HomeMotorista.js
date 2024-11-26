import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function HomeMotorista({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.divheader}>
                <Image
                    source={require('../ft/logo3.png')}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.botao}>
                    <Text style={styles.bttxt}>Log off</Text>
                </TouchableOpacity>

            </View>
            <ScrollView style={styles.meio}>
                <View style={styles.cardcontainer}>
                    <View style={styles.card}>
                        <View style={styles.ft}>
                            <Image
                                source={require('../ft/mapa.jpg')}
                                style={styles.mapa}
                            />
                        </View>
                        <View style={styles.info}>
                            <View style={styles.tipo}>
                                <Text style={styles.tipotxt}>Ida matutino</Text>
                            </View>
                            <View style={styles.entrar}>
                                <TouchableOpacity style={styles.botaoacessar} onPress={() => navigation.navigate('AlunosRota', { "periodo": "ida matutino" })} >
                                    <Text style={styles.bttxt}>Acessar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.ft}>
                            <Image
                                source={require('../ft/mapa.jpg')}
                                style={styles.mapa}
                            />
                        </View>
                        <View style={styles.info}>
                            <View style={styles.tipo}>
                                <Text style={styles.tipotxt}>Volta matutino</Text>
                            </View>
                            <View style={styles.entrar}>
                                <TouchableOpacity style={styles.botaoacessar} onPress={() => navigation.navigate('AlunosRota', { "periodo": "volta matutino" })} >
                                    <Text style={styles.bttxt}>Acessar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.ft}>
                            <Image
                                source={require('../ft/mapa.jpg')}
                                style={styles.mapa}
                            />
                        </View>
                        <View style={styles.info}>
                            <View style={styles.tipo}>
                                <Text style={styles.tipotxt}>Ida vespertino</Text>
                            </View>
                            <View style={styles.entrar}>
                                <TouchableOpacity style={styles.botaoacessar} onPress={() => navigation.navigate('AlunosRota', { "periodo": "ida vespertino" })} >
                                    <Text style={styles.bttxt}>Acessar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.ft}>
                            <Image
                                source={require('../ft/mapa.jpg')}
                                style={styles.mapa}
                            />
                        </View>
                        <View style={styles.info}>
                            <View style={styles.tipo}>
                                <Text style={styles.tipotxt}>Volta vespertino</Text>
                            </View>
                            <View style={styles.entrar}>
                                <TouchableOpacity style={styles.botaoacessar} onPress={() => navigation.navigate('AlunosRota', { "periodo": "volta vespertino" })} >
                                    <Text style={styles.bttxt}>Acessar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.card}>
                        <View style={styles.ft}>
                            <Image
                                source={require('../ft/mapa.jpg')}
                                style={styles.mapa}
                            />
                        </View>
                        <View style={styles.info}>
                            <View style={styles.tipo}>
                                <Text style={styles.tipotxt}>Ida noturno</Text>
                            </View>
                            <View style={styles.entrar}>
                                <TouchableOpacity style={styles.botaoacessar} onPress={() => navigation.navigate('AlunosRota', { "periodo": "ida noturno" })} >
                                    <Text style={styles.bttxt}>Acessar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.ft}>
                            <Image
                                source={require('../ft/mapa.jpg')}
                                style={styles.mapa}
                            />
                        </View>
                        <View style={styles.info}>
                            <View style={styles.tipo}>
                                <Text style={styles.tipotxt}>Volta noturno</Text>
                            </View>
                            <View style={styles.entrar}>
                                <TouchableOpacity style={styles.botaoacessar} onPress={() => navigation.navigate('AlunosRota', { "periodo": "volta noturno" })} >
                                    <Text style={styles.bttxt}>Acessar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.espaco}>

                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    divheader: {
        width: '100%',
        height: '15%',
        backgroundColor: '#3B1D1D',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    image: {
        width: '40%',
        height: '40%',
        marginTop: 40,
        marginLeft: -10,
    },
    botao: {
        width: '30%',
        height: '40%',
        backgroundColor: 'white',
        marginTop: 40,
        marginLeft: 60,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bttxt: {
        color: '#7A1F1F',
        fontSize: 25,
        fontWeight: '500',
    },
    meio: {
        width: '100%',
        height: '85%',
    },
    cardcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: 330,
        height: 190,
        backgroundColor: '#7A1F1F',
        marginTop: 20,
        borderRadius: 8,
    },
    ft: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapa: {
        height: '98%',
        width: '98%',
        marginTop: 5,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
    },
    info: {
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'row',
    },
    tipo: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'left',
        marginLeft: 20,
    },
    tipotxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    entrar: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoacessar: {
        width: '65%',
        height: '50%',
        backgroundColor: 'white',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -20,
    },
    espaco: {
        height: 40,
        width: '100%',
    },
});
