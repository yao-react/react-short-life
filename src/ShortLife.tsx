import { FC, ReactElement, useEffect, useRef } from 'react';
import { useTimeout } from '@yao-react/use-timeout';

type Props = {
  feeding?: boolean;
  beforeAlive?: number;
  beforeDead?: number;
  render?: (alive: boolean) => ReactElement | null;
};

export const ShortLife: FC<Props> = ({
  feeding = false,
  beforeAlive = 0,
  beforeDead = 1000,
  render,
}) => {
  const isFirstRender = useIsFirstRender();
  const onDone = useTimeout(feeding && (isFirstRender || beforeAlive));
  const offDone = useTimeout(!feeding && (isFirstRender || beforeDead));

  const living = feeding || !offDone;
  const alive = living && feeding && onDone;

  return living ? render?.(alive) ?? null : null;
};

function useIsFirstRender() {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  return firstRenderRef.current;
}
