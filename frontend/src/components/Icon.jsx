/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
const Icons = ({
  icon,
  className,
  width,
  fill,
  rotate,
  hFlip,
  vFlip,
  onClick,
}) => {
  return (
    <>
      <Icon
        onClick={onClick}
        //
        // data-aos='zoom-in'
        // data-aos-duration='1000'
        width={width}
        rotate={rotate}
        flip={hFlip}
        fill={fill}
        icon={icon}
        className={className}
        vFlip={vFlip}
      />
    </>
  );
};

export default Icons;
