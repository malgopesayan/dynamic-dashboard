// src/components/ui/TimelineSlider.tsx
'use client';

import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useStore } from '@/store/store';
import { Tooltip } from 'antd';
import { Switch } from 'antd';

const TimelineSlider = () => {
  const { selectedTime, setTime, selectedTimeRange, setTimeRange } = useStore();
  const [rangeMode, setRangeMode] = React.useState(false);

  React.useEffect(() => {
    if (!selectedTime) {
      setTime(new Date());
    }
  }, [selectedTime, setTime]);

  const totalHours = 30 * 24; // 720 hours in 30 days
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 15);
  startDate.setHours(0, 0, 0, 0); // Start at the beginning of the day

  // Helper to get hour offset from startDate
  const getHourOffset = (date: Date) => Math.round((date.getTime() - startDate.getTime()) / (1000 * 60 * 60));

  // Single mode
  const currentValue = selectedTime ? getHourOffset(selectedTime) : 0;

  // Range mode
  const currentRange = selectedTimeRange
    ? [getHourOffset(selectedTimeRange[0]), getHourOffset(selectedTimeRange[1])]
    : [currentValue, currentValue + 1];

  const handleSliderChange = (value: number | number[]) => {
    if (rangeMode && Array.isArray(value)) {
      const newStart = new Date(startDate);
      newStart.setHours(startDate.getHours() + value[0]);
      const newEnd = new Date(startDate);
      newEnd.setHours(startDate.getHours() + value[1]);
      setTimeRange([newStart, newEnd]);
    } else if (!rangeMode && typeof value === 'number') {
      const newDate = new Date(startDate);
      newDate.setHours(startDate.getHours() + value);
      setTime(newDate);
    }
  };

  if (!selectedTime) {
    return <div style={{ padding: '20px 40px', background: '#f0f2f5', textAlign: 'center' }}>Initializing timeline...</div>;
  }

  return (
    <div style={{ padding: '20px 40px', background: '#f0f2f5' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ marginRight: 8, color: !rangeMode ? 'blue' : undefined }}>Single</span>
        <Switch checked={rangeMode} onChange={setRangeMode} />
        <span style={{ marginLeft: 8, color: rangeMode ? 'green' : undefined }}>Range</span>
      </div>
      <Tooltip title={
        rangeMode && selectedTimeRange
          ? selectedTimeRange
            ? `${selectedTimeRange[0].toLocaleString()} - ${selectedTimeRange[1].toLocaleString()}`
            : ''
          : selectedTime.toLocaleString()
      }>
        <Slider
          min={0}
          max={totalHours - 1}
          value={rangeMode ? currentRange : currentValue}
          onChange={handleSliderChange}
          step={1}
          range={rangeMode}
        />
      </Tooltip>
      <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: rangeMode ? 'green' : 'blue' }}>
        {rangeMode && selectedTimeRange
          ? selectedTimeRange
            ? `Selected Range: ${selectedTimeRange[0].toLocaleString()} - ${selectedTimeRange[1].toLocaleString()}`
            : ''
          : `Selected Time: ${selectedTime.toLocaleString()}`}
      </div>
    </div>
  );
};

export default TimelineSlider;