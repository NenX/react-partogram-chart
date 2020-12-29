import React, { useEffect, useRef, useState } from 'react';
import { DrawPartogram } from './components/Partogram';
import { IProps } from "./types";
export default ({ data }: IProps) => {
  const box = useRef<HTMLDivElement>(null);
  const canvas1 = useRef<HTMLCanvasElement>(null);
  const canvas2 = useRef<HTMLCanvasElement>(null);
  const [checked, setChecked] = useState(false);
  const ref = useRef<DrawPartogram>(null)
  useEffect(() => {
    if (!ref.current) {
      const { width, height } = box?.current?.getBoundingClientRect() as DOMRect;
      //@ts-ignore
      ref.current = new DrawPartogram({
        canvas: canvas1.current as HTMLCanvasElement,
        canvas2: canvas2.current as HTMLCanvasElement,
        width,
        height,
        data
      });
    } else {
      ref.current.render(data)
    }

  }, [data]);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={box}>
      <canvas
        ref={canvas1}
        id="canvas"
        width="1200"
        height="480"
        style={{ position: 'absolute' }}
      >
        <p>Your browserdoes not support the canvas element.</p>
      </canvas>

      <canvas
        ref={canvas2}
        id="canvas2"
        width="1200"
        height="480"
        style={{ position: 'absolute' }}
      >
        <p>Your browserdoes not support the canvas element.</p>
      </canvas>
    </div>

  );
};
