import { AsyncStorage } from 'react-native';
export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    console.log(AsyncStorage.getItem(apartment));
    AsyncStorage.getItem(apartment)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
