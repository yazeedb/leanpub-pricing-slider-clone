import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { toDollarFormat } from '../toDollarFormat';
import './Slider.scss';

const calculateProgressWidth = ({ min, max, amount, wrapperWidth }) =>
  (amount / (max - min)) * wrapperWidth;

export const Slider = ({
  label,
  amount,
  min = 0,
  max,
  onChange,
  primary = true
}) => {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [trackMouse, setTrackMouse] = useState(false);
  const sliderWrapperRef = useRef(null);
  const sliderHandleRef = useRef(null);

  useLayoutEffect(() => {
    if (!sliderWrapperRef.current) {
      return;
    }

    setWrapperWidth(sliderWrapperRef.current.offsetWidth);
  }, [wrapperWidth]);

  const sliderHandleOffset = 15;

  const updateSliderHandlePosition = e => {
    const wrapperElement = sliderWrapperRef.current;
    const newSliderHandleX =
      e.clientX + wrapperElement.offsetLeft - sliderHandleOffset;
    const amountPercentage = newSliderHandleX / wrapperElement.offsetWidth;

    onChange(amountPercentage);
  };

  useEffect(() => {
    if (trackMouse === false) {
      return;
    }

    const stopTrackingAndCleanUp = () => {
      setTrackMouse(false);
      document.removeEventListener('mousemove', updateSliderHandlePosition);
    };

    document.addEventListener('mousemove', updateSliderHandlePosition);
    document.addEventListener('mouseup', stopTrackingAndCleanUp);

    return () => {
      document.removeEventListener('mouseup', stopTrackingAndCleanUp);
    };
  }, [trackMouse]);

  const sliderProgressWidth = calculateProgressWidth({
    min,
    max,
    amount,
    wrapperWidth
  });

  const mouseEventProps = primary
    ? {
        onMouseDown: () => {
          setTrackMouse(true);
        }
      }
    : {};

  return (
    <div
      className="slider-wrapper"
      ref={sliderWrapperRef}
      onClick={updateSliderHandlePosition}
    >
      <label>{label}</label>
      <div className={primary ? 'slider primary' : 'slider secondary'}>
        <div
          className="slider-progress"
          style={{ width: sliderProgressWidth }}
        />

        <div
          className="slider-handle-wrapper"
          style={{ left: sliderProgressWidth - sliderHandleOffset }}
          {...mouseEventProps}
        >
          <div className="slider-handle" ref={sliderHandleRef} />
        </div>

        <div className="slider-price-wrapper">
          <span className="slider-price">{toDollarFormat(amount)}</span>
        </div>
      </div>
    </div>
  );
};
