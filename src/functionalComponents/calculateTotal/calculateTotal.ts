/* eslint-disable @typescript-eslint/no-explicit-any */
export const calculateTotalPrice = (value: any) => {
  let sum = 0;
  for (let i = 0; i < value?.length; i++) {
    sum = sum + value[i];
  }
  return sum;
};
