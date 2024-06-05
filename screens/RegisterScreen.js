import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigation = useNavigation();

  const validateName = () => {
    if (!name || name.length < 3) {
      setNameError('Name must be at least 3 characters long');
    } else {
      setNameError('');
    }
  };

  const validateEmail = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password || password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword || confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = () => {
    validateName();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    // Proceed with registration if all validations pass
    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      const user = {
        name: name,
        email: email,
        password: password,
        role: role,
      };

      axios
        .post('http://192.168.1.7:8000/register', user)
        .then(response => {
          console.log(response);
          Alert.alert(
            'Registration successful',
            'You have been registered successfully',
          );
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        })
        .catch(error => {
          Alert.alert(
            'Registration Error',
            'An error occurred while registering',
          );
          console.log('Registration failed', error);
        });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#007260', fontSize: 17, fontWeight: '600' }}>
            Register
          </Text>

          <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 15 }}>
            Register To your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            onBlur={validateName}
            style={styles.input}
            placeholderTextColor={'black'}
            placeholder="Enter your name"
          />
          {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            onBlur={validateEmail}
            style={styles.input}
            placeholderTextColor={'black'}
            placeholder="Enter Your Email"
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            onBlur={validatePassword}
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor={'black'}
            placeholder="Password"
          />
          {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

          <TextInput
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            onBlur={validateConfirmPassword}
            secureTextEntry={true}
            style={styles.input}
            placeholderTextColor={'black'}
            placeholder="Confirm Password"
          />
          {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}

          {/* Role Selection */}
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>
              Role
            </Text>
            <View style={{ flexDirection: 'row', marginVertical: 10, marginTop: 15 }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 20,
                }}
                onPress={() => setRole('doctor')}>
                {/* Doctor Selection */}
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  {role === 'doctor' && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: 'gray',
                      }}
                    />
                  )}
                </View>
                <Text>Doctor</Text>
              </TouchableOpacity>

              {/* Patient Selection */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => setRole('patient')}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'gray',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  {role === 'patient' && (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 5,
                        backgroundColor: 'gray',
                      }}
                    />
                  )}
                </View>
                <Text>Patient</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          {/* Go Back */}
          <Pressable onPress={() => navigation.goBack()} style={styles.goBackButton}>
            <Text style={styles.goBackButtonText}>Already Have an account? Sign in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: -5,
    marginBottom: 10,
  },
  registerButton: {
    width: 200,
    backgroundColor: '#007260',
    padding: 15,
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 6,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goBackButton: {
    marginTop: 6,
  },
  goBackButtonText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});

export default RegisterScreen;
