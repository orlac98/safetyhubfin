import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import CardView from "react-native-cardview";
import Colours from "../constants/Colours";

const FormsScreen = ({ navigation }) => {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View flexDirection="row">
          <CardView
            cardElevation={7}
            cardMaxElevation={7}
            cornerRadius={20}
            style={styles.card}
          >
            <View>
              <Text
                style={styles.text}
                onPress={() => navigation.navigate("Construction")}
              >
                Construction 
              </Text>
            </View>
          </CardView>
        </View>
        <View flexDirection="row">
          <CardView
            cardElevation={7}
            cardMaxElevation={7}
            cornerRadius={20}
            style={styles.card}
          >
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("Asbestos")}
            >
              Asbestos
            </Text>
          </CardView>
        </View>
        <View flexDirection="row">
          <CardView
            cardElevation={7}
            cardMaxElevation={7}
            cornerRadius={20}
            style={styles.card}
          >
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("Height")}
            >
              Work at Height
            </Text>
          </CardView>
        </View>  
      </View>
    </SafeAreaView>
  );
};

export default FormsScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#Fff",
  },
  icon: {
    color: Colours.red,
    margin: 20,
    paddingLeft: 20,
  },
  card: {
    backgroundColor: Colours.grey,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    marginTop: 20,
    margin: 10,
  },
  text: {
    textAlign: "center",
    color: Colours.white,
    margin: 30,
    height: 49,
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: "space-between",
    fontFamily: "Comfortaa-Bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 15,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
});
