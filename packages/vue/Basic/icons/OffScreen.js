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
  name: "OffScreen",
  render() {
    return (
      <svg
        width={this.size}
        height={this.size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" fill="white" fill-opacity="0.01" />
        <path
          d="M33 6V15H42"
          stroke={this.colors[0]}
          stroke-width="3"
          stroke-linecap="square"
          stroke-linejoin="bevel"
        />
        <path
          d="M15 6V15H6"
          stroke={this.colors[0]}
          stroke-width="3"
          stroke-linecap="square"
          stroke-linejoin="bevel"
        />
        <path
          d="M15 42V33H6"
          stroke={this.colors[0]}
          stroke-width="3"
          stroke-linecap="square"
          stroke-linejoin="bevel"
        />
        <path
          d="M33 42V33H41.8995"
          stroke={this.colors[0]}
          stroke-width="3"
          stroke-linecap="square"
          stroke-linejoin="bevel"
        />
      </svg>
    )
  },
}
