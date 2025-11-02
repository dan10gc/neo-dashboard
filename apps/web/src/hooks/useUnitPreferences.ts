import { useState, useEffect } from 'react';
import type { DiameterUnit, DistanceUnit } from '@/lib/units';

/**
 * Hook to manage user preferences for unit display
 * Preferences are persisted to localStorage
 */
export const useUnitPreferences = () => {
  // Load from localStorage or use defaults
  const [diameterUnit, setDiameterUnit] = useState<DiameterUnit>(() => {
    const saved = localStorage.getItem('diameterUnit');
    return (saved as DiameterUnit) || 'km';
  });

  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(() => {
    const saved = localStorage.getItem('distanceUnit');
    return (saved as DistanceUnit) || 'AU';
  });

  // Persist to localStorage whenever unit changes
  useEffect(() => {
    localStorage.setItem('diameterUnit', diameterUnit);
  }, [diameterUnit]);

  useEffect(() => {
    localStorage.setItem('distanceUnit', distanceUnit);
  }, [distanceUnit]);

  // Toggle functions to cycle through units
  const toggleDiameterUnit = () => {
    const units: DiameterUnit[] = ['km', 'mi', 'm'];
    const currentIndex = units.indexOf(diameterUnit);
    setDiameterUnit(units[(currentIndex + 1) % units.length]);
  };

  const toggleDistanceUnit = () => {
    const units: DistanceUnit[] = ['AU', 'LD', 'km'];
    const currentIndex = units.indexOf(distanceUnit);
    setDistanceUnit(units[(currentIndex + 1) % units.length]);
  };

  return {
    diameterUnit,
    distanceUnit,
    toggleDiameterUnit,
    toggleDistanceUnit
  };
};
