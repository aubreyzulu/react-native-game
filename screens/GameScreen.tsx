import { use } from 'chai';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import GuessedNumber from '../components/game/GuessNumber';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import generateRandomNumber from '../utils/randomNumber';
import GuessedLogItem from '../components/game/GuessedLogItem';

let minBoundary = 1;
let maxBoundary = 100;

interface GameScreenProps {
  userNumber: number;
  handleGameOver: (numOfRounds: number) => void;
}

type Direction = 'lower' | 'greater';

function GameScreen({ userNumber, handleGameOver }: GameScreenProps) {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessedRounds, setGuessedRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess == userNumber) {
      handleGameOver(guessedRounds.length);
    }
  }, [currentGuess, userNumber, handleGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function handleNextGuess(direction: Direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    }
    if (direction === 'greater') {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
    setGuessedRounds((prevGuessedRounds) => [
      newRandomNumber,
      ...prevGuessedRounds,
    ]);
  }
  const guessedRoundLength = guessedRounds.length;
  return (
    <View style={styles.screen}>
      <Title>Opponents Guess</Title>
      <GuessedNumber>{currentGuess}</GuessedNumber>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess('lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => handleNextGuess('greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessedRounds.map((round) => (
          <Text key={round}>{round}</Text>
        ))} */}
        <FlatList
          data={guessedRounds}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => (
            <GuessedLogItem
              roundNumber={guessedRoundLength - index}
              guessedNumber={item}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
