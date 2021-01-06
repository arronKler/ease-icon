
export interface SVGRectElementAttribute {
  [x: string]: string
}

export interface SVGPathElementAttribute {
  [x: string]: string
}

export interface SVGPathModel {
  '$': SVGPathElementAttribute
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
  path: SVGPathModel[]
}

export interface SVGModel {
  svg: SVGObjectModel
}