import { useEffect } from 'react';

export const useMouseTracking = ({ trackMouse, onMove, cleanupFunction }) => {
  useEffect(
    () => {
      if (trackMouse === false) {
        return;
      }

      const stopTrackingAndCleanUp = () => {
        cleanupFunction();
        document.removeEventListener('mousemove', onMove);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', stopTrackingAndCleanUp);

      return () => {
        document.removeEventListener('mouseup', stopTrackingAndCleanUp);
      };
    },
    [trackMouse]
  );
};
