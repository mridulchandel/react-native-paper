import firestore from '@react-native-firebase/firestore';

export const getAllFirestore = (collectionName, uid) => {
  return firestore()
    .collection(collectionName)
    .get()
    .then((querySnapshot) => {
      // console.log('Total users: ', querySnapshot.size);
      const products = [];
      querySnapshot.forEach((documentSnapshot) => {
        products.push({id: documentSnapshot.id, ...documentSnapshot.data()});
      });
      return products;
    });
};

export const getFirestore = (collectionName, uid) => {
  return firestore()
    .collection(collectionName)
    .doc(uid)
    .get()
    .then((documentSnapshot) => {
      console.log((documentSnapshot, 'fetching'));
      return documentSnapshot.data();
    });
};

export const getSnapShot = (collectionName, uid) => {
  return firestore()
    .collection(collectionName)
    .doc(uid)
    .onSnapshot((documentSnapshot) => {
      return documentSnapshot.data();
    });
};

export const setFirestore = (collectionName, uid, data) => {
  return firestore()
    .collection(collectionName)
    .doc(uid)
    .set(data)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

export const updateFirestore = (collectionName, uid, data) => {
  return firestore()
    .collection(collectionName)
    .doc(uid)
    .update(data)
    .then(() => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};

export const deleteFirestore = (collectionName, uid) => {
  return firestore()
    .collection(collectionName)
    .doc(uid)
    .delete()
    .then(() => {
      return true;
    })
    .catch((err) => {
      return false;
    });
};
