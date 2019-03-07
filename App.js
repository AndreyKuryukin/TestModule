import React, { Component } from 'react';
import { NativeModules, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, getTheme, ThemeContext } from 'react-native-material-ui';
import axios from 'axios';


const HelloManager = NativeModules.HelloManager;

const uiTheme = {
    palette: {
        primaryColor: '#ff8000',
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};


export default class App extends React.Component {

    state = {
        loggedIn: false
    };

    onLogin = () => {
        HelloManager.greetUser('User name', true, this.isAdminCallback);

        axios({
            url: 'http://192.168.192.247:8088/api/v1/auth/login',
            method: 'POST',
            data: {
                language: "RUSSIAN",
                login: this.state.login,
                password: this.state.password,
            }
        })
            .then(({ headers }) => {
                const token = headers.authorization;
                this.setState({ loggedIn: true, token });
                this.getCurrentUser(token);
            })
            .catch((e) => {
                this.setState({ loggedIn: false, token: null });
                return e
            })
    };

    getCurrentUser = (token) => {
        axios({
            url: 'http://192.168.192.247:8088/api/v1/user/current',
            method: 'GET',
            headers: {
                Authorization: token
            }
        }).then(({ data: user }) => {
            this.setState({ user })
        }).catch((e) => {
            this.setState({ loggedIn: false, token: null, user: null });
            return e
        })
    };

    isAdminCallback = (text) => {
        this.setState({ text });
    };

    render() {
        const { user } = this.state;
        return (
            <ThemeContext.Provider value={getTheme(uiTheme)}>
                <View style={styles.container}>
                    <Text style={styles.label}>
                        SQM
                    </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.loginField}
                            onChangeText={(login) => this.setState({ login })}
                            value={this.state.login}
                            placeholder={'Логин'}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.passwordField}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                            placeholder={'Пароль'}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.loginButton}
                            disabled={!this.state.login || !this.state.password}
                            primary
                            raised
                            text={'Войти'}
                            onPress={this.onLogin}
                        />
                    </View>
                    {user && <View style={styles.userInfoContainer}>
                        <Text>{`Имя: ${user.first_name}`}</Text>
                        <Text>{`Фамилия: ${user.last_name}`}</Text>
                        <Text>{`Логин: ${user.login}`}</Text>
                        <Text>{`Таймзона: ${user.timezone_id}`}</Text>
                        <Text>{`ID: ${user.id}`}</Text>
                        <Text>Роли: {user.roles && <Text>
                                {user.roles.map(role => role.description).join(', ')}
                            </Text>}
                        </Text>
                    </View>}
                </View>
            </ThemeContext.Provider>
        );
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            fontSize: 18,
            color: '#02486E'
        },
        loginField: {
            height: 40,
            width: 200,
            color: '#02486E'
        },
        passwordField: {
            height: 40,
            width: 200,
            color: '#02486E'

        },
        inputContainer: {
            borderBottomWidth: 2,
            borderColor: '#02486E',
            height: 40,
            width: 200
        },
        loginButton: {
            marginVertical: 8,
            width: 200
        },
        buttonContainer: {
            marginTop: 16,
            width: 200
        },
        userInfoContainer: {
            marginTop: 16,
            padding: 8,
            width: 200,
            borderWidth: 1,
            borderRadius: 4,
        }
    });
