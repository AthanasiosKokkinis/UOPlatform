import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Search(props: any) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <Path
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}