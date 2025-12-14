/**
 * Returns the provided YYYY-MM string if valid, otherwise returns the current month.
 */
const resolveMonth = (input: string | null) => {
  const now = new Date();
  const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  // Validate: Exists + Matches YYYY-MM + Month is 01-12
  const isValid = input && /^\d{4}-(0[1-9]|1[0-2])$/.test(input);
  const result = isValid ? input : current;

  return result as `${number}-${number}`
};

export default resolveMonth;
