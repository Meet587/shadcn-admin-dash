import { format } from 'date-fns';

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'dd MMM yyyy');
};

const formatCurrency = (value: string) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value));
};

export { formatCurrency, formatDate };
