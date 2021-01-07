/* Auto-generated code */

export default {
  props: {
    size: {
      type: String,
      default: "42",
    },
    colors: {
      type: Array,
      default: () => ["#333"],
    },
    mode: {
      type: String,
      defualt: "single",
    },
  },
  name: "Security",
  render() {
    return (
      <svg
        width={this.size}
        height={this.size}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g>
            <rect
              fill-opacity="0.01"
              fill="#FFFFFF"
              x="0"
              y="0"
              width="48"
              height="48"
              stroke-width="3"
              stroke="none"
              fill-rule="evenodd"
            />
            <path
              d="M6,8.25564385 L24.008642,3 L42,8.25564385 L42,19.0336798 C42,30.3621834 34.7502223,40.4194233 24.0026245,44.0005035 L24.0026245,44.0005035 C13.2520792,40.4194856 6,30.3599802 6,19.0286999 L6,8.25564385 Z"
              stroke="#333"
              stroke-width="3"
              fill="#333"
              fill-rule="nonzero"
              stroke-linejoin="bevel"
            />
          </g>
        </g>
      </svg>
    )
  },
}
