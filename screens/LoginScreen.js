import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from "react";
import { TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '../constants';
import { ActivityIndicator } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [btnLoading, setBtnLoading] = useState(false)
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Home");
        } else {
          // token not found , show the login screen itself
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    setBtnLoading(true)
    const user = {
      email: email,
      password: password,
    };

    axios
      .post(`${API_URL}/login`, user)
      .then((response) => {
        setBtnLoading(false)
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        AsyncStorage.setItem("user",JSON.stringify(response.data.user) );

        navigation.replace("Home");
      })
      .catch((error) => {
        setBtnLoading(false)
        Alert.alert("Login Error", "Invalid email or password");
        console.log("Login Error", error);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#007260", fontSize: 17, fontWeight: "600" }}>
            Sign In
          </Text>

          <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 15 }}>
            Sign In to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="enter Your Email"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={"black"}
              placeholder="Passowrd"
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#007260",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            {btnLoading?
            <ActivityIndicator color={'#fff'} />
            :
            <Text
            style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
              >
              Login
            </Text>
            }
          </TouchableOpacity>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Dont't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});