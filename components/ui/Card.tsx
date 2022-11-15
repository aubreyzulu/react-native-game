import { ReactNode } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Colors from '../../constants/colors';

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return <View style={styles.container}>{children}</View>;
}
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    borderRadius: 8,
    marginTop: deviceWidth < 380 ? 18 : 36,
    padding: 16,
    backgroundColor: Colors.primary800,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
export default Card;
