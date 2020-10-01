# @yao-react/react-short-life

Help maintain React component with short life.

## Motivation

From [this article](https://www.differencebetween.com/difference-between-alive-and-vs-living/):

- Living is just passing the days as a being breathing, eating, sleeping, etc.
- Being alive is living at a higher level of consciousness and taking note of our surroundings.

Lots of react components are of short-life, such as popup menu, modal, drawer...

For them, the truthy prop `open/show/visible` means being alive, but they need longer lives than that:

- before alive, they may need to be initialized for some reason
- after alive, they need some time to complete the closing animation

However, we can't make them immortal for reasons such as memory optimization or refreshed starting status.

`ShortLife` component is here to help us manage their short lives.

## Install

```
npm install @yao-react/react-short-life
```

```
yarn add @yao-react/react-short-life
```

## Getting started

```tsx
import { useState } from 'react';
import { ShortLife } from '@yao-react/react-short-life';
import { Modal } from 'some-package';

function Demo() {
  const [showModal, setShowModal] = useState(false);

  function handleClickButton() {
    setShowModal(x => !x);
  }

  return (
    <div>
      <button onClick={handleClickButton}>Toggle modal</button>
      <ShortLife feeding={showModal} render={(alive) => <Modal visible={alive}/>}>
    </div>
  );
}
```

## Props

| Name        | Type                                     | Default | Description                                                  |
| ----------- | ---------------------------------------- | ------- | ------------------------------------------------------------ |
| feeding     | boolean                                  | false   |                                                              |
| beforeAlive | number                                   | 0       | negative value means immediately and no timer will be set up |
| beforeDead  | number                                   | 1000    | same as above                                                |
| render      | (alive: boolean) => ReactElement \| null |         |                                                              |

## Metaphor

- Your component is not living at first
  - `feeding` is `false`
  - the `render` function is uncalled
- You start to feed it
  - set `feeding` to `true`
  - the `render` function is called with `alive = false`
- After some time of feeding, your component become alive
  - the `render` function is called with `alive = true`
  - the length of such time is specified by `beforeAlive`
- Play with your component
- When you feel bored, you stop feeding your component, though still living, it become hungry and not alive anymore
  - set `feeding` to `false`
  - the `render` function is called with `alive = false`
- After some time of being hungry, your component die
  - the `render` function is uncalled
  - the length of such time is specified by `beforeDead`

## License

MIT
