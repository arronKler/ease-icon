declare module 'rollup-plugin-progress' {
  function progress(...args: any): any;
  export = progress;
}

declare module 'svgtofont' {
  function svgtofont(...args: any): any;
  export = svgtofont;
}

declare module 'font-carrier' {
  namespace fontCarrier {
    function transfer(...args: any): any;
    function setSvg(...args: any): any;
    function create(...args: any): any;
  }

  export = fontCarrier;
  // export = fontCarrier
}
