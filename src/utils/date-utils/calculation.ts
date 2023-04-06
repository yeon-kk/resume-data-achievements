interface DataPropsType {
  [date: string]: number;
}

export const dataSum = (data: DataPropsType) => {
  let result = 0;
  Object.values(data).map((value) => (result += value));
  return result;
};

export const dataWeekEverage = (data: DataPropsType, weekCount: number) => {
  let result = 0;
  Object.values(data).map((value) => (result += value));
  return result / weekCount;
};
