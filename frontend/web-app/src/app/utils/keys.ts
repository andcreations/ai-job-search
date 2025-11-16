export const isEnterKey = (event: any) => {
  return event.key === 'Enter';
};

export const ifEnterKey = (func: () => void) => {
  return (event: any) => {
    if (event.key == 'Enter') {
      func();
    }
  };
}