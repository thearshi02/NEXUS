/**
 * NEXUS India Localization & Currency Formatters
 * Uses standard en-IN locale and Indian numbering system (e.g. ₹1,25,000.00)
 */

export const formatINR = (amount: number, showDecimals = false): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
};

export const formatCompactINR = (amount: number): string => {
  if (isNaN(amount) || amount === 0) return '₹0';
  
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 10000000) {
    // Crores (Cr)
    return `${sign}₹${(abs / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (abs >= 100000) {
    // Lakhs (L)
    return `${sign}₹${(abs / 100000).toFixed(2).replace(/\.00$/, '')} L`;
  }
  if (abs >= 1000) {
    // Thousands (k)
    return `${sign}₹${(abs / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  
  return `${sign}₹${abs}`;
};

export const formatIndianDate = (dateString: string | Date): string => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return String(dateString);

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(date);
};

export const formatIndianDateTime = (dateString: string | Date): string => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return String(dateString);

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(date);
};

export const formatPercentage = (val: number): string => {
  if (isNaN(val)) return '0.0%';
  return `${val.toFixed(1)}%`;
};
