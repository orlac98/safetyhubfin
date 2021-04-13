import * as React from "react";
import { Image, Dimensions, View, Text, StyleSheet, ScrollView} from "react-native";
import Asbestos from "./Asbestos";


const AsbestosPreview = ({ route }) => {
  console.log(route.params.fileData);

  return (
    <ScrollView>
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.h1}>
            NOTIFICATION FORM TO BE USED FOR ANY WORK INVOLVING ASBESTOS
          </Text>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Notifier Name:</Text>
        <Text style={styles.text}>{route.params.formData.name}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Notification Date:</Text>
        <Text style={styles.text}>{route.params.formData.date}</Text>
      </View>

      <View style={styles.topView}>
        <Text style={styles.mainText}>Address:</Text>
        <Text style={styles.text}>{route.params.formData.address}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Telephone:</Text>
        <Text style={styles.text}>{route.params.formData.no}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Eircode:</Text>
        <Text style={styles.text}>{route.params.formData.code}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Client Name:</Text>
        <Text style={styles.text}>{route.params.formData.client}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Client Details:</Text>
        <Text style={styles.text}>{route.params.formData.clientD}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Asbestos Removal:</Text>
        <Text style={styles.text}>{route.params.formData.remove}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>1st Contact:</Text>
        <Text style={styles.text}>{route.params.formData.contact0}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>2nd Contact:</Text>
        <Text style={styles.text}>{route.params.formData.contact1}</Text>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    width: "95%",
    alignSelf: "center",
    marginTop: 5,
  },
  mainText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    width: "45%",
  },
  text: {
    fontSize: 18,
    flexWrap: "wrap",
    width: "50%",
  },
  h1: {
    textAlign: "center",
    color: "#fb8856",
    margin: 2,
    marginTop: 8,
  },
});

export default AsbestosPreview;
