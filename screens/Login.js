import { StyleSheet, Text, View, Image, TextInput, Pressable, Alert } from 'react-native';
import { Divider, PaperProvider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import Signup from './Signup';
import React, { createContext } from 'react';
import { Checkbox } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import IPv4Address from '../ipAddress/IPv4Address';
import { loadCart, updateCart } from '../redux/CartReducer';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

export default function Login({ navigation }) {
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [checked, setChecked] = React.useState(true);

    const handleLogin = async () => {
        const ip = IPv4Address();

        try {
            const response = await fetch(`http://${ip}:3000/user`);

            const users = await response.json();

            const foundUser = users.find(
                (user) => user.email === username && user.password === password
            );

            if (!foundUser) {
                Toast.show({
                    type: 'error',
                    text1: 'Email và password chưa chính xác!',
                });
                return;
            }

            setUserInfo(foundUser);

            setLoggedIn(true);

            await AsyncStorage.setItem('id', foundUser.id);

            console.log('Login Successful', foundUser);

            Toast.show({
                type: 'success',
                text1: 'Đăng nhập thành công!',
            });

            navigation.push('Account', { username: foundUser.email });
        } catch (error) {
            console.log('Error:', error);

            Toast.show({
                type: 'failed',
                text1: 'Email và password chưa chính xác!',
            });
        }
    };

    return (
        <PaperProvider>
            <View style={
                {
                    backgroundColor: '#fff'
                }
            }>
                <View style={styles.container}>
                    <View style={{
                        height: 80
                    }}>
                        <Image style={styles.img} source={'https://hasaki.vn/images/graphics/img_login_fb_2.jpg'} />

                    </View>
                    <View style={
                        {
                            height: 50
                        }
                    }>
                        <Image style={styles.img} source={'https://hasaki.vn/images/graphics/img_login_gg_2.jpg'} />

                    </View>
                </View>

                <View style={styles.center}>
                    <Text>Hoặc tài khoản Hasaki.vn</Text>

                    <View style={{
                        marginTop: 100,
                        width: 380,
                        gap: 15,
                        display: 'flex',

                    }}>
                        <TextInput value={username}
                            onChangeText={setUsername} placeholderTextColor="gray" placeholder='Email'></TextInput>
                        <Divider />
                        <TextInput placeholderTextColor="gray" placeholder='Password' value={password}
                            onChangeText={setPassword}
                            secureTextEntry></TextInput>
                        <Divider />
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}>
                            <Text style={{
                                display: 'flex',
                                color: '#0d5c37',
                                fontWeight: 600,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                width: 120

                            }}>Forgot password?</Text>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                    color="#306E51"

                                />
                                <Text style={{ flexWrap: 'wrap' }}>Nhớ tài khoản của tôi</Text>

                            </View>


                        </View>

                    </View>
                    <View style={{
                        display: 'flex',
                        gap: 20
                    }}>
                        <Pressable style={{
                            width: 380,
                            height: 50,
                            backgroundColor: '#0d5c37'
                        }} onPress={handleLogin}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                marginTop: 15
                            }}>LOGIN</Text>
                        </Pressable>

                        <Pressable style={{
                            width: 380,
                            height: 50,
                            border: '1px solid #0d5c37'
                        }} onPress={() => {
                            navigation.push('Signup')
                        }}>
                            <Text style={{
                                color: '#0d5c37',
                                textAlign: 'center',
                                marginTop: 15
                            }}>SIGNUP</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </PaperProvider>
    )

};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    center: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    img: {
        height: 45,
        width: 200,
    },

}
)