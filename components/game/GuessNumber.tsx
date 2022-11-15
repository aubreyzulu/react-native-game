import { ReactNode } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/colors';

interface GuessedNumberProp {
  children: ReactNode;
}
function GuessedNumber({ children }: GuessedNumberProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    fontFamily: 'open-sans-bold',
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    margin: deviceWidth < 380 ? 12 : 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberText: {
    fontFamily: 'open-sans-bold',
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 28 : 36,
  },
});

export default GuessedNumber;
