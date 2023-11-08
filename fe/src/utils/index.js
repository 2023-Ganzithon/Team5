export const formatTommdd = (date) => {
  if (!(date instanceof Date)) {
    throw new Error('유효한 날짜 객체가 아닙니다.');
  }

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${month}.${day}`;
};
