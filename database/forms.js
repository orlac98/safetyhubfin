import firebase from "../database/firebaseDb";

export function addAsbestosform(asbestos, asbestosComplete) {
  firebase
    .firestore()
    .collection("AsbestosForms")
    .add(asbestos)
    .then((snapshot) => {
      asbestos.id = snapshot.id;
      snapshot.set(asbestos);
    })
    .then(() => asbestosComplete())
    .catch((error) => console.log(error));
}
