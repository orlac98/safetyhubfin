import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";


//authcontext import allows us to use the functionallity for the login that is in authprovider file
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>SafetyHub</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        autoCompleteType="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
      
      <FormButton
        buttonTitle="Sign In"
        onPress={() => {
          if (email && password) {
            login(email, password);
          } else {
            alert("please fill all fields");
          }
        }}
      />

     

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C3641",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 28,
    marginBottom: 10,
    color: "#FB8856",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
    color: "#FD5F57",
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FD5F57",
    fontFamily: "Comfortaa-Regular",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
});
