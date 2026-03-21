import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

type IconProps = SvgProps & {
  color?: string;
  size?: number;
};

export const Upvote = ({
  color = '#000',
  size = 24,
  ...props
}: IconProps) => {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      {...props}
    >
      <Path
        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};