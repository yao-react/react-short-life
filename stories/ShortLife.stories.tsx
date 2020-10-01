import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { ShortLife } from '../src';

export default {
  title: 'ShortLife',
  component: ShortLife,
};

export const demo = () => {
  const [feeding, setFeeding] = useState(true);

  const renderDemo = useCallback(alive => {
    return <Demo alive={alive} />;
  }, []);

  return (
    <div>
      <p>
        <button onClick={() => setFeeding(x => !x)}>toggle on</button>
      </p>
      <p>feeding: {String(feeding)}</p>
      <ShortLife
        feeding={feeding}
        beforeAlive={500}
        beforeDead={1000}
        render={renderDemo}
      />
    </div>
  );
};

const Demo = ({ alive }: any) => {
  useEffect(() => {
    console.log('demo mount');
    return () => console.log('demo unmount');
  }, []);

  useEffect(() => {
    console.log('demo render');
  });

  return <p>alive: {String(alive)}</p>;
};
