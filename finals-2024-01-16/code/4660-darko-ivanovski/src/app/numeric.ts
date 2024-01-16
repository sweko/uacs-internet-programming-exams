export const isNumeric = (value: string | null): boolean => {
    if(value === null) {
      return false;
    }
    const numValue = parseInt(value);
    return !isNaN(numValue);
  }