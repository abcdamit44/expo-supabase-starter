import { Image, type ImageProps } from "expo-image";
import type { FC } from "react";

interface LogoProps extends Partial<ImageProps> {
  size?: number;
  width?: number;
  height?: number;
}

export const Logo: FC<LogoProps> = ({ size = 40, width, height, style, ...props }) => {
  const logoWidth = width || size;
  const logoHeight = height || size;

  return (
    <Image
      source={require("../assets/logo.png")}
      style={[
        {
          width: logoWidth,
          height: logoHeight,
        },
        style,
      ]}
      contentFit="contain"
      {...props}
    />
  );
};
