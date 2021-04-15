import React, { Component, useContext } from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Button,
  Item,
  Label,
  Input,
  Form,
  Text,
  H3,
H1
} from "native-base";
import "firebase/firestore";
import firebaseSetup from "../database/firebaseDb";

import {
  addDoc,
  removeDoc,
  updateDoc,
  onSnapshot,
} from "../database/collections";

const Height = () => {
  const { firestore, auth } = firebaseSetup();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState("");
  const [detailsC, setDetailsC] = useState("");
  const [detailsF, setDetailsF] = useState("");
  const [inspection, setInspection] = useState("");
  const [signature, setSignature] = useState("");
  

  const formRefH = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("height");

  const addHeight = (async) => {
    let data = {
      name,
      address,
      location,
      date,
      results,
      detailsC,
      detailsF,
      inspection,
      signature,
      
    };
    addDoc(formRefH, data);
  };

  return (
    <Container style={styles.container}>
      <Content>
        <Form>
        <H3 style={styles.h3}>
        Form GA3
          </H3>
          <H1 style={styles.h1}>
          Work Equipment for Work at a Height
          </H1>
          
          <Item stackedLabel>
            <Label>Name of person for whom the inspection was carried out:</Label>
            <Input value={name} onChangeText={setName} />
          </Item>
          <Item stackedLabel>
            <Label>Address where inspection was carried out:</Label>
            <Input value={address} onChangeText={setAddress} />
          </Item>
          <Item stackedLabel>
            <Label>Location & Description of Equipment & any Identification Numbers / Marks:</Label>
            <Input value={location} onChangeText={setLocation} />
          </Item>
          <Item stackedLabel>
            <Label>Date and Time of Inspection:</Label>
            <Input value={date} onChangeText={setDate} />
          </Item>
          <Item stackedLabel>
            <Label>Results of Inspection* including defects & locations:</Label>
            <Input value={results} onChangeText={setResults} />
          </Item>
          <Item stackedLabel>
            <Label>Details of any corrective actions taken:</Label>
            <Input value={detailsC} onChangeText={setDetailsC} />
          </Item>
          <Item stackedLabel>
            <Label>Details of any further action necessary:</Label>
            <Input value={detailsF} onChangeText={setDetailsF} />
          </Item>
          <Item stackedLabel>
            <Label>Name and position of person making inspection:</Label>
            <Input value={inspection} onChangeText={setInspection} />
          </Item>
          <Item stackedLabel>
            <Label>Signature of person who made inspection: </Label>
            <Input value={signature} onChangeText={setSignature} />
          </Item>
        </Form>
        <Button block style={styles.button} onPress={() => addHeight(alert("Saved Successfully"))}>
          <Text>Submit</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#45505d",
    margin: 15,
    marginTop: 50,
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
