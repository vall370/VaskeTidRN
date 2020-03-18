import { useEffect } from 'react';
import { AsyncStorage } from 'react-native';

const Initial = ({ navigation }) => {
  useEffect(() => {
    const getApartment = async () => {
      const apartment = await AsyncStorage.getItem('apartment');
      if (apartment) {
        navigation.navigate('Protected');
      } else {
        navigation.navigate('Auth');
      }
    };
    getApartment();
  }, [navigation]);

  return null;
};

export default Initial;
