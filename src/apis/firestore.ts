import { User } from '_types';
import _ from 'lodash';
import * as database from './database';
import firebase from 'firebase';
import 'firebase/firestore';

export const firestore = () => firebase.firestore();
export const getUserData = () => firebase.auth().currentUser;

export const getUserRef = (uid: string) => {
  return firestore()
    .collection('users')
    .doc(uid);
};

export const getCurrentUserRef = () => {
  const { uid } = getUserData();
  return firestore()
    .collection('users')
    .doc(uid);
};

export const createUser = async (userData: any) => {
  const { email, password } = userData;

  return new Promise((res, rej) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userRecord => {
        const { uid } = userRecord.user;
        const { username } = userData;
        getCurrentUserRef().set({
          ..._.omit(userData, ['password'], ['username']),
          uid,
          online: false,
          displayName: username,
          photoURL: null,
          name: `${userData.fname} ${userData.sname}`,
        });
        getFriendsRef(uid).set({ init: '' });
        database.getChatRef(`${uid}`).set({});
        res();
      })
      .catch(error => {
        rej(error);
      });
  });
};

export const signIn = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const { email, password } = credentials;
  return new Promise((res, rej) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        getCurrentUserRef()
          .get()
          .then(snapshot => {
            res(snapshot.data());
          });
      })
      .catch(error => {
        rej(error);
      });
  });
};
