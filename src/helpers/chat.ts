import firebase from 'firebase';

export const listenChat = (
  myUid: string,
  friendUid: string,
  onMessagePosted: (message: any) => void,
) => {
  firebase
    .database()
    .ref(`chat/${myUid}/messages/${friendUid}`)
    .limitToLast(30)
    .on('child_added', snapshot => {
      const message = snapshot.val();
      onMessagePosted(message);
    });
};
