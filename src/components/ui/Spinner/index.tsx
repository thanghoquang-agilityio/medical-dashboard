import { memo } from 'react';
import { Spinner as SpinnerNextUI, SpinnerProps } from '@nextui-org/react';

export const Spinner = memo(({ size = 'lg', classNames }: SpinnerProps) => {
  const circleClass = 'border-[5px] border-b-primary-100 border-l-primary-100';

  return (
    <div className="absolute inset-0 z-10">
      <SpinnerNextUI
        size={size}
        classNames={{
          circle1: `${circleClass} ${classNames?.circle1 || ''}`,
          circle2: `${circleClass} ${classNames?.circle2 || ''}`,
        }}
        className="absolute inset-0 m-auto z-60"
      />
    </div>
  );
});

Spinner.displayName = 'Spinner';
