import firebase from 'firebase';

const database = () => firebase.database();

export const getChatRef = (chatPath: string) => {
  return database().ref(`chats/${chatPath}`);
};

export const getFriendsRef = (uid: string) => {
  return database().ref(`friends/${uid}`);
};
