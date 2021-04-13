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
  H1,
} from "native-base";
import "firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider";
import firebaseSetup from "../database/firebaseDb";

import {
  addDoc,
  removeDoc,
  updateDoc,
  onSnapshot,
} from "../database/collections";

const Quarries = () => {
  const { firestore, auth } = firebaseSetup();
  //   const { user, logout } = useContext(AuthContext);
  //   const [form, setForm] = useState(null);
  const [name, setName] = useState("");
  const [operator, setOperator] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [quarryName, setQuarryName] = useState("");
  const [place, setPlace] = useState("");
  const [ordnance, setOrdnance] = useState("");
  const [commence, setCommence] = useState("");
  

  const formRef = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("forms");

  const addQuarries = (async) => {
    let data = {
      name,
      operator,
      date,
      address,
      telephone,
      quarryName,
      place,
      ordnance,
      commence,
    };
    addDoc(formRef, data);
  };

  return (
    <Container style={styles.container}>
      <Content>
        <Form>
          <H3 style={styles.h1}>
            {" "}
            NOTIFICATION OF APPOINTMENT OR CHANGE OF OPERATOR OR COMMENCEMENT OR
            PERMANENT CESSATION OF QUARRYING OPERATIONS
          </H3>

          <Item stackedLabel>
            <Label>
            Name of Person or Company under which the business is carried on: 
            </Label>
            <Input value={name} onChangeText={setName} />
          </Item>
          <Item stackedLabel>
            <Label>Name of Operator:</Label>
            <Input value={address} onChangeText={setAddress} />
          </Item>
          <Item stackedLabel>
            <Label>
            Date:
            </Label>
            <Input value={location} onChangeText={setLocation} />
          </Item>
          <Item stackedLabel>
            <Label>Address:</Label>
            <Input value={date} onChangeText={setDate} />
          </Item>
          <Item stackedLabel>
            <Label>Telephone:</Label>
            <Input value={results} onChangeText={setResults} />
          </Item>
          <Item stackedLabel>
            <Label>Name of Quarry:</Label>
            <Input value={detailsC} onChangeText={setDetailsC} />
          </Item>
          <Item stackedLabel>
            <Label>Place where Quarry is situated:</Label>
            <Input value={detailsF} onChangeText={setDetailsF} />
          </Item>
          <Item stackedLabel>
            <Label>Ordnance Survey Grid References:</Label>
            <Input value={inspection} onChangeText={setInspection} />
          </Item>
          <Item stackedLabel>
            <Label>Date when operations are to Commence/Cease: </Label>
            <Input value={signature} onChangeText={setSignature} />
          </Item>
        </Form>
        <Button block style={styles.button} onPress={() => addQuarries()}>
          <Text>Submit</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Quarries;

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
