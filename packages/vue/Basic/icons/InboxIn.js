/* Auto-generated code */

export default {
  props: {
    size: {
      type: String,
      default: "42",
    },
    colors: {
      type: Array,
      default: () => ["#333", "#333"],
    },
    mode: {
      type: String,
      defualt: "single",
    },
  },
  name: "InboxIn",
  data() {
    return {
      defaultColors: [
        "$MainStrokeColor$",
        "$MainFillColor$",
        "$SecondStrokeColor$",
        "$SecondFillColor$",
      ],
    }
  },
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
            <polyline
              stroke="#333"
              stroke-width="3"
              stroke-linecap="square"
              stroke-linejoin="bevel"
              points="4 30 9 6 9 6 39 6 44 30"
              fill="none"
              fill-rule="evenodd"
            />
            <polyline
              stroke="#333"
              stroke-width="3"
              stroke-linecap="square"
              stroke-linejoin="bevel"
              points="18 20 24 26 30 20"
              fill="none"
              fill-rule="evenodd"
            />
            <polygon
              stroke="#333"
              stroke-width="3"
              fill="#333"
              fill-rule="nonzero"
              stroke-linejoin="bevel"
              points="4 30 14.9090909 30 16.7272727 36 31.2727273 36 33.0909091 30 44 30 44 43 4 43"
            />
            <path
              d="M24,26 L24,14"
              stroke="#333"
              stroke-width="3"
              stroke-linecap="square"
              stroke-linejoin="bevel"
              fill="none"
              fill-rule="evenodd"
            />
          </g>
        </g>
      </svg>
    )
  },
}
