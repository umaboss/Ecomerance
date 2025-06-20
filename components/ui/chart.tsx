// components/ui/chart.js
import React from 'react';
import { cn } from '@/lib/utils'; // Optional utility for classnames

export const ChartContainer = ({ children, config, className, ...props }) => {
  const style = document?.documentElement?.style;

  if (config) {
    for (const key in config) {
      if (config[key].color) {
        style.setProperty(`--color-${key}`, config[key].color);
      }
    }
  }

  return (
    <div
      className={cn(
        "flex justify-center aspect-video text-xs outline-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
