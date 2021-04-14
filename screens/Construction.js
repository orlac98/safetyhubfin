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
import { AuthContext } from "../navigation/AuthProvider";
import firebaseSetup from "../database/firebaseDb";

import {
  addDoc,
  removeDoc,
  updateDoc,
  onSnapshot,
} from "../database/collections";

const Construction = () => {
  const { firestore, auth } = firebaseSetup();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [no, setNo] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [addresSite, setAddresSite] = useState("");
  const [signed, setSigned] = useState("");
  const [position, setPosition] = useState("");
  

  const formRefC = firestore()
    .collection("users")
    .doc(auth().currentUser.uid)
    .collection("construction");

  const addConstruction = (async) => {
    let data = {
      name,
      date,
      address,
      no,
      email,
      desc,
      addresSite,
      signed,
      position,
      
    };
    addDoc(formRefC, data);
  };

  return (
    <Container style={styles.container}>
      <Content>
        <Form>
          <H1 style={styles.h1}>
          Approved Form (AF 1) 
          </H1>
          <H3 style={styles.h3}>
          Particulars to be notified by the Client to the Health and Safety Authority
before the design process begins
          </H3>
          <Text style={styles.h3}>
          Client 
          </Text>
          <Item stackedLabel>
            <Label>Date of Notification:</Label>
            <Input value={date} onChangeText={setDate} />
          </Item>
          <Item stackedLabel>
            <Label>Name:</Label>
            <Input value={name} onChangeText={setName} />
          </Item>
          <Item stackedLabel>
            <Label>Address:</Label>
            <Input value={address} onChangeText={setAddress} />
          </Item>
          <Item stackedLabel>
            <Label>Telephone:</Label>
            <Input value={no} onChangeText={setNo} />
          </Item>
          <Item stackedLabel>
            <Label>Email:</Label>
            <Input value={email} onChangeText={setEmail} />
          </Item>
          
          <Text style={styles.h3}>
          Information on Construction Work:
          </Text>
          <Item stackedLabel>
            <Label>Description of Project:</Label>
            <Input value={desc} onChangeText={setDesc} />
          </Item>
          <Item stackedLabel>
            <Label>Exact Address of Construction Site:</Label>
            <Input value={addresSite} onChangeText={setAddresSite} />
          </Item>
          <Item stackedLabel>
            <Label>Signed:</Label>
            <Input value={signed} onChangeText={setSigned} />
          </Item>
          <Item stackedLabel>
            <Label>Position: </Label>
            <Input value={position} onChangeText={setPosition} />
          </Item>
        </Form>
        <Button block style={styles.button} onPress={() => addConstruction()}>
          <Text>Submit</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Construction;

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
