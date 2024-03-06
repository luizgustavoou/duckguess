export const compareAnswer = (answer: string, value: string) => {
  return (
    answer
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase() ==
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
  );
};
