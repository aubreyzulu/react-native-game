import { ReactNode } from 'react';
import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import Colors from '../../constants/colors';

interface InstructionTextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}
function InstructionText({ children, style }: InstructionTextProps) {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;
const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
});
