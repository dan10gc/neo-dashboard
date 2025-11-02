export type DiameterUnit = 'km' | 'mi' | 'm';
export type DistanceUnit = 'AU' | 'LD' | 'km';

// Conversion constants
const KM_TO_MILES = 0.621371;
const KM_TO_METERS = 1000;
const AU_TO_KM = 149597871;
const AU_TO_LD = 389.17; // 1 AU ≈ 389 Lunar Distances

/**
 * Format diameter value in the specified unit
 * @param km - Diameter in kilometers
 * @param unit - Target unit (km, mi, m)
 * @returns Formatted string with value and unit label
 */
export const formatDiameter = (km: number, unit: DiameterUnit): string => {
  const conversions = {
    km: { value: km, label: 'km', decimals: 1 },
    mi: { value: km * KM_TO_MILES, label: 'mi', decimals: 1 },
    m: { value: km * KM_TO_METERS, label: 'm', decimals: 0 }
  };

  const { value, label, decimals } = conversions[unit];

  // Format large numbers with commas
  if (value > 1000) {
    return `${value.toLocaleString(undefined, {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    })} ${label}`;
  }

  return `${value.toFixed(decimals)} ${label}`;
};

/**
 * Format distance value in the specified unit
 * @param au - Distance in astronomical units
 * @param unit - Target unit (AU, LD, km)
 * @returns Formatted string with value and unit label
 */
export const formatDistance = (au: number, unit: DistanceUnit): string => {
  const conversions = {
    AU: { value: au, label: 'AU', decimals: 4 },
    LD: { value: au * AU_TO_LD, label: 'LD', decimals: 2 },
    km: { value: au * AU_TO_KM, label: 'km', decimals: 0 }
  };

  const { value, label, decimals } = conversions[unit];

  // Format large numbers with commas
  if (value > 1000) {
    return `${value.toLocaleString(undefined, {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    })} ${label}`;
  }

  return `${value.toFixed(decimals)} ${label}`;
};

/**
 * Get human-readable label for distance unit
 * @param unit - Distance unit
 * @returns Human-readable label
 */
export const getDistanceUnitLabel = (unit: DistanceUnit): string => {
  const labels = {
    AU: 'astronomical units',
    LD: 'lunar distances',
    km: 'kilometers'
  };
  return labels[unit];
};
