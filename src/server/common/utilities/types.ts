export const isObjectRecord
= (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object'
  && value !== null
  && !Array.isArray(value)
);

// export const isRequest = (value: unknown): value is Request<{}, any, any,
// QueryString.ParsedQs, Record<string, any>> => (
//   typeof value === 'object'
//   && value !== null
//   && !Array.isArray(value)
// );
