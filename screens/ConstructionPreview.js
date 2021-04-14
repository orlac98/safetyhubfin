import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ConstructionPreview = ({ route }) => {
  console.log(route.params.fileData);

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={styles.h1}>Approved Form (AF 1)</Text>
        <Text style={styles.h3}>
          Particulars to be notified by the Client to the Health and Safety
          Authority before the design process begins
        </Text>
        <Text style={styles.h3}>Client</Text>
        <View style={styles.topView}>
          <Text style={styles.mainText}>Date of Notification:</Text>
          <Text style={styles.text}>{route.params.formData.date}</Text>
        </View>
        <View style={styles.topView}>
          <Text style={styles.mainText}>Name:</Text>
          <Text style={styles.text}>{route.params.formData.name}</Text>
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
          <Text style={styles.mainText}>Email:</Text>
          <Text style={styles.text}>{route.params.formData.email}</Text>
        </View>
        <Text style={styles.h3}>Information on Construction Work:</Text>
        <View style={styles.topView}>
          <Text style={styles.mainText}>Description of Project:</Text>
          <Text style={styles.text}>{route.params.formData.desc}</Text>
        </View>
        <View style={styles.topView}>
          <Text style={styles.mainText}>
            Exact Address of Construction Site:
          </Text>
          <Text style={styles.text}>{route.params.formData.addresSite}</Text>
        </View>
        <View style={styles.topView}>
          <Text style={styles.mainText}>Signed:</Text>
          <Text style={styles.text}>{route.params.formData.signed}</Text>
        </View>
        <View style={styles.topView}>
          <Text style={styles.mainText}>Position:</Text>
          <Text style={styles.text}>{route.params.formData.position}</Text>
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
  h3: {
    textAlign: "center",
    color: "black",
    margin: 2,
    marginTop: 8,
  },
});

export default ConstructionPreview;
