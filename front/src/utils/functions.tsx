export const handleSpaces = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/\s/g, "");
};
