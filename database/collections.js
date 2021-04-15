
//used for displaying documents in a collection 
export const onSnapshot = (ref, callback, options) => {
  ref.onSnapshot((snapshot) => {
    let items = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    items = options && options.sort ? items.sort(options.sort) : items;
    callback(items);
  });
};

//will add document to collection and give it a id 
export const addDoc = (ref, { id, ...data }) => {
  const doc = id ? ref.doc(id) : ref.doc();
  doc.set(data).then(() => {
    // alert("Saved Successfully");
  });
};

//functionality for deleting documents in a collection by id 
export const removeDoc = (ref, id) => {
  ref
    .doc(id)
    .delete()
    .then(() => {
    });
};

//functionality for updating documents in a collection by id 
export const updateDoc = (ref, id, data) => {
  ref
    .doc(id)
    .set(data)
    .then(() => {
    });
};
