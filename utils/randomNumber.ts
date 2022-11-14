/**
 * Generates a random number
 * @param min
 * @param max
 * @param exclude
 * @returns number
 */
function generateRandomNumber(
  min: number,
  max: number,
  exclude: number
): number {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  }
  return randomNumber;
}

export default generateRandomNumber;
