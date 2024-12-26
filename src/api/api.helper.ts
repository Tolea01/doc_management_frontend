export const getContentType = () => ({ 'Content-Type': 'application/json' });

export const errorCatch = (error: any): string | string[] => {
  const message = error?.response?.data?.message;
  const serverErrors = error?.response?.data?.errors;

  return (
    serverErrors
      ?.flatMap((err: any) => Object.values(err.constraints).map(String))
      .join('\n') ||
    (message ? (typeof message === 'object' ? message : message) : error.message)
  );
};