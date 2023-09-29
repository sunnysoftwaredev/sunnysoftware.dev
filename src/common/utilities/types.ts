import type { TimeObject } from '../../server/database';

export const isObjectRecord
= (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object'
  && value !== null
  && !Array.isArray(value)
);

export const isTimeArray = (value: unknown): value is TimeObject[] => {
  if (Array.isArray(value) && value[0] !== null && value[0] !== 'undefined') {
    if ('unixStart' in value[0]
    && 'unixEnd' in value[0]) {
      return true;
    }
  }
  return false;
};

// export const isTimeArray = (value: unknown): value is TimeObject[] => {
//   if (Array.isArray(value) && value[0] !== null) {
//     console.log('check one');

//     console.log('check two');
//     if (value[0] !== null) {
//       console.log('check check 3');
//       if ('unixStart' in value[0]) {
//         console.log('check 4');
//         if ('unixEnd' in value[0]) {
//           console.log('check 5');
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// };

// export const isTimeArray = (value: unknown): value is TimeObject[] => {
//   if (Array.isArray(value) && value[0] !== null
//   && value[0].includes('unixStart')
//    && value[0].includes('unixEnd')) {
//     return true;
//   }
//   return false;
// };

// export const isTimeArray = (value: unknown): value is TimeObject[] => {
//   if (Array.isArray(value) && value[0] !== null
//   && (value as TimeObject).unixStart !== undefined
//    && (value as TimeObject).unixEnd !== undefined) {
//     return true;
//   }
//   return false;
// };
// export const isTimeArray = (value: unknown): value is TimeObject[] => {
//   if (Array.isArray(value) && value[0] !== null
//   && isTimeObject(value[0])) {
//     return true;
//   }
//   return false;
// };

// const isTimeObject = (value: unknown): value is TimeObject => {
//   return (
//     typeof value === 'object' &&
//     value !== null &&
//     'unixStart' in value &&
//     'unixEnd' in value
//   );
// };
