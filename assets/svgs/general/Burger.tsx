import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Burger = ({ color = '#000', size = 24,...props }: any) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      {...props}
    >
      <Path
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};