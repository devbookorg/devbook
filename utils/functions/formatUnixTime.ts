const formatUnixTime = (unixTimestamp: number): string => {
  const date: Date = new Date(unixTimestamp * 1000); // Unix 시간은 초 단위이므로 밀리초로 변환해야 합니다.

  const year: number = date.getUTCFullYear();
  const month: string = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day: string = date.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export default formatUnixTime;
