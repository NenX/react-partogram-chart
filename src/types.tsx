export type Canvas = HTMLCanvasElement;
export type Ctx = CanvasRenderingContext2D;
export interface I {
  canvas: Canvas;
  canvas2: Canvas;
  width: number;
  height: number;
  data: IData[]
}
export interface IData {
  checktime: string,
  cd: number,
  df: number,
  event: string

}

export interface IProps {
  data: IData[]
}