import { User, Message } from '_types';
import _ from 'lodash';
import * as database from './database';
import firebase from 'firebase';
import 'firebase/firestore';
import { sendChatMessage } from '../actions/creators/chat';

export const firestore = () => firebase.firestore();
export const getUserData = () => firebase.auth().currentUser;

const DEV_UID = 'lx10Roar4pYE95nuSUFBNR2RTb93';
const DEF_READED_TIME = 'Sun Apr 12 2020 11:20:00 GMT+0200 (CEST)';

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
      .then(async userRecord => {
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
        await database.getChatRef(`${uid}`).set({});
        await firebase
          .database()
          .ref(`friends/${uid}/${DEV_UID}`)
          .set('friends');
        await firebase
          .database()
          .ref(`friends/${DEV_UID}/${uid}`)
          .set('friends');

        const message: Message = {
          text: 'Welcome to my portfolio app',
          createdAt: new Date().toString(),
          _id: '1',
          user: {
            _id: DEV_UID,
          },
        };
        await sendChatMessage(uid, DEV_UID, message);
        await database.getChatRef(`${DEV_UID}/${uid}/readed`).update({
          [DEV_UID]: DEF_READED_TIME,
        });
        await database.getChatRef(`${uid}/${DEV_UID}/readed`).update({
          [DEV_UID]: DEF_READED_TIME,
        });
        res();
      })
      .catch(error => {
        console.log(error.message);
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
