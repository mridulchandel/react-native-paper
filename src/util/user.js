import firestore from '@react-native-firebase/firestore';

export const getFirestore = (collectionName, uid) => {
  return firestore()
    .collection(collectionName)
    .doc(uid)
    .get()
    .then((documentSnapshot) => {
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
