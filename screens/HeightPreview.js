import * as React from "react";
import { H3,H1, View, Text, StyleSheet,ScrollView } from "react-native";


const HeightPreview = ({ route }) => {
  console.log(route.params.fileData);

  return (
    <ScrollView >
      <View style={{ flex: 1, padding: 10 , marginBottom: 20}}>
          <Text style={styles.h3}>
        Form GA3
          </Text>
          <Text style={styles.h1}>
          Work Equipment for Work at a Height
          </Text>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Name of person for whom the inspection was carried out:</Text>
        <Text style={styles.text}>{route.params.formData.name}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Address where inspection was carried out:</Text>
        <Text style={styles.text}>{route.params.formData.address}</Text>
      </View>

      <View style={styles.topView}>
        <Text style={styles.mainText}>Address:Location & Description of Equipment & any Identification Numbers / Marks:</Text>
        <Text style={styles.text}>{route.params.formData.location}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Date and Time of Inspection:</Text>
        <Text style={styles.text}>{route.params.formData.date}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Results of Inspection* including defects & locations:</Text>
        <Text style={styles.text}>{route.params.formData.results}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Details of any corrective actions taken:</Text>
        <Text style={styles.text}>{route.params.formData.detailsC}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Details of any further action necessary:</Text>
        <Text style={styles.text}>{route.params.formData.detailsF}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Name and position of person making inspection:</Text>
        <Text style={styles.text}>{route.params.formData.inspection}</Text>
      </View>
      <View style={styles.topView}>
        <Text style={styles.mainText}>Signature of person who made inspection:</Text>
        <Text style={styles.text}>{route.params.formData.signature}</Text>
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

export default HeightPreview;
