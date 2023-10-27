import { format, parseISO } from 'date-fns';
import ukLocale from 'date-fns/locale/uk';

export const formatDate = stringDate => {
  if (typeof stringDate !== 'string') {
    return 'Invalid Date';
  }

  const parsedDate = parseISO(stringDate);

  if (isNaN(parsedDate)) {
    return 'Invalid Date';
  }

  return format(parsedDate, 'PPpp', {
    locale: ukLocale,
  });
};
