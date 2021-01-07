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
  name: "Dislike",
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
          d="M24 31L21 26L28 20L19 15L20 9.19942C18.4999 8.43256 16.8004 8 15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C31.1996 8 29.5001 8.43256 28 9.19942"
          stroke={this.colors[0]}
          stroke-width="3"
          stroke-linecap="square"
          stroke-linejoin="bevel"
        />
      </svg>
    )
  },
}
