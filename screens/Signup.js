import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { Divider, PaperProvider } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';

import Toast from 'react-native-toast-message';

import IPv4Address from "../ipAddress/IPv4Address";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [checked, setChecked] = React.useState(true);

    const navigation = useNavigation();

    const validateEmail = (email) => {
        return email.includes('@');
    };

    function checkTextInput() {
        //Check for the Name TextInput
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!(nameRegex.test(name))) {
            alert('Please Enter Name Correctly!');
            return false;
        }
        //Check for the Email TextInput
        if (!(email.includes('@'))) {
            alert('Please Enter Email');
            return false;
        }
        if (password.length < 6) {
            alert('Please Enter Password > 6 character');
            return false;
        }
        if (phone.length < 10) {
            alert('Please Enter Phone Number Correctly!');
            return false;
        }

        return true;
    };

    const addUser = async (navigation) => {
        try {
            const ip = IPv4Address();
            const url = `http://${ip}:3000/user`;

            if (!checkTextInput()) {
                console.error('invalid input')
                return;
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                }),
            });

            const data = await response.json()

            await AsyncStorage.setItem("id", data.id);

            addCart()

            Toast.show({
                type: 'success',
                text1: 'Đăng kí thành công!',
            });

            console.log("User added:", data);

            navigation.push('Login')
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const addCart = async () => {
        try {
            const userId = await AsyncStorage.getItem('id');

            console.log(userId);

            if (!userId) {
                console.error('Error adding cart: userId undefined');
                return;
            }

            const ip = IPv4Address();
            const url = `http://${ip}:3000/carts`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productList: [],
                    id: userId
                }),
            })

            const data = await response.json()

            console.log("Cart added:", data);
        } catch (error) {
            console.error("Error adding cart:", error);
        }
    };

    return (
        <PaperProvider>
            <View style={{
                display: 'flex',
                gap: 15,
                padding: 15
            }}>
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="gray"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    mode="outlined"
                />
                <Divider />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    mode="outlined"
                />
                <Divider />
                <TextInput
                    placeholder="Phone"
                    placeholderTextColor="gray"
                    value={phone}
                    keyboardType="numeric"
                    onChangeText={(text) => setPhone(text)}
                    mode="outlined"
                />
                <Divider />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    mode="outlined"
                />
                <Divider />

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
                    <Text style={{ flexWrap: 'wrap' }}>Tôi đã đọc và đồng ý với Điều kiện giao dịch chung và Chính sách bảo mật thông tin của Hasaki</Text>

                </View>


                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20
                }}>
                    <Pressable style={{
                        width: '90%',
                        height: 50,
                        backgroundColor: '#0d5c37'
                    }} onPress={() => { addUser(navigation) }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            marginTop: 15
                        }}
                        >SIGNUP</Text>
                    </Pressable>

                    <Pressable style={{
                        width: 380,
                        height: 50,
                        border: '1  solid #0d5c37'
                    }} onPress={() => {
                        navigation.push(Login)
                    }}>
                        <Text style={{
                            color: '#0d5c37',
                            textAlign: 'center',
                            marginTop: 15
                        }}>LOGIN</Text>
                    </Pressable>
                </View>
            </View>
        </PaperProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    textInput: {
    }
}
)