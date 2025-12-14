const resolveMonth = (input: string | null) => {
  const now = new Date();
  const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}` as const;

  const isValid = input && /^\d{4}-(0[1-9]|1[0-2])$/.test(input);
  const month = (isValid ? input : current) as `${number}-${number}`;

  const status: 'past' | 'current' | 'future' =
    month === current 
      ? 'current' 
      : month < current 
        ? 'past' 
        : 'future';

  return { month, status };
};

export default resolveMonth;
