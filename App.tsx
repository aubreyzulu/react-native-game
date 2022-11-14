import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  const [userPickerNumber, setUserPickerNumber] = useState<null | number>(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessedRounds, setGuessedRounds] = useState(0);
  /**
   * Load app fonts
   */
  const [fontLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  function handlePickerNumber(pickedNumber: number) {
    setUserPickerNumber(pickedNumber);
    setGameIsOver(false);
  }
  function handleGameOver(numOfRounds: number) {
    setGameIsOver(true);
    setGuessedRounds(numOfRounds);
  }

  function handleGameRestart() {
    setUserPickerNumber(null);
    setGuessedRounds(0);
  }

  let screen = <StartGameScreen handlePickerNumber={handlePickerNumber} />;

  if (userPickerNumber) {
    screen = (
      <GameScreen
        userNumber={userPickerNumber}
        handleGameOver={handleGameOver}
      />
    );
  }
  if (gameIsOver && userPickerNumber) {
    screen = (
      <GameOverScreen
        userNumber={userPickerNumber}
        roundsNumber={guessedRounds}
        onStartGame={handleGameRestart}
      />
    );
  }
  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.root}
    >
      <ImageBackground
        source={require('./assets/images/background.png')}
        resizeMode="cover"
        style={styles.root}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.root}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
