const calculateRating = (number: number) => {
  const elements = Array.from({ length: number }, (_, index) => index + 1);
  return elements;
};

export default calculateRating;
