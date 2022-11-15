import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';

interface StartGameScreenProps {
  handlePickerNumber: (pickedNumber: number) => void;
}

function StartGameScreen({ handlePickerNumber }: StartGameScreenProps) {
  const [number, setNumber] = useState('');

  const { width, height } = useWindowDimensions();
  function handleNumberChange(value: string) {
    setNumber(value);
  }
  function handleResetInput() {
    setNumber('');
  }
  function handleConfirmInput() {
    const parsed = parseInt(number);

    if (isNaN(parsed) || parsed <= 0 || parsed > 99) {
      // show alert
      Alert.alert('Invalid number', 'Number has to be  between 1 and 99', [
        { text: 'Okay', style: 'destructive', onPress: handleResetInput },
      ]);
      return;
    }
    handlePickerNumber(parsed);
  }

  const marginTopDistance = height < 380 ? 30 : 100;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.root, { marginTop: marginTopDistance }]}>
          <Title>Guess my number</Title>
          <Card>
            <InstructionText>Enter a number</InstructionText>
            <TextInput
              style={styles.textInput}
              maxLength={2}
              value={number}
              keyboardType="number-pad"
              autoCapitalize="none"
              onChangeText={handleNumberChange}
              autoCorrect={false}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleResetInput}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleConfirmInput}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  screen: {
    flex: 1,
  },

  textInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
