
export interface SVGRectElementAttribute {
  [x: string]: string
}

export interface SVGPathElementAttribute {
  [x: string]: string
}

export interface SVGElementAttribute {
  width: string;
  height: string;
  viewBox: string;
  [x: string]: string
}

export interface SVGObjectModel {
  '$': SVGElementAttribute
  rect: SVGRectElementAttribute[]
  path: SVGPathElementAttribute[]
}

export interface SVGModel {
  svg: SVGObjectModel
}