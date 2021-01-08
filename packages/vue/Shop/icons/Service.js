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
  name: "Service",
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
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="path-1-inside-1" fill="white">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 10.5997 0.417344 12.1019 1.14909 13.4036L0.404226 16.3831C0.221131 17.1155 0.884525 17.7789 1.61691 17.5958L4.59636 16.8509C5.89814 17.5827 7.40033 18 9 18Z"
          />
        </mask>
        <path
          d="M1.14909 13.4036L3.08937 13.8887L3.2823 13.117L2.89253 12.4236L1.14909 13.4036ZM0.404226 16.3831L-1.53606 15.898L-1.53606 15.898L0.404226 16.3831ZM1.61691 17.5958L1.13183 15.6555H1.13183L1.61691 17.5958ZM4.59636 16.8509L5.57637 15.1075L4.88297 14.7177L4.11129 14.9106L4.59636 16.8509ZM16 9C16 12.866 12.866 16 9 16V20C15.0751 20 20 15.0751 20 9H16ZM9 2C12.866 2 16 5.13401 16 9H20C20 2.92487 15.0751 -2 9 -2V2ZM2 9C2 5.13401 5.13401 2 9 2V-2C2.92487 -2 -2 2.92487 -2 9H2ZM2.89253 12.4236C2.32462 11.4133 2 10.2476 2 9H-2C-2 10.9518 -1.48993 12.7904 -0.594349 14.3837L2.89253 12.4236ZM2.34451 16.8682L3.08937 13.8887L-0.791195 12.9186L-1.53606 15.898L2.34451 16.8682ZM1.13183 15.6555C1.86422 15.4724 2.52761 16.1358 2.34451 16.8682L-1.53606 15.898C-2.08534 18.0952 -0.0951659 20.0853 2.10198 19.5361L1.13183 15.6555ZM4.11129 14.9106L1.13183 15.6555L2.10198 19.5361L5.08143 18.7912L4.11129 14.9106ZM9 16C7.75242 16 6.58669 15.6754 5.57637 15.1075L3.61635 18.5943C5.20959 19.4899 7.04824 20 9 20V16Z"
          fill={this.colors[1]}
          mask="url(#path-1-inside-1)"
          stroke={this.colors[0]}
        />
        <path
          d="M5 11C5 11 6 13 9 13C12 13 13 11 13 11"
          stroke={this.colors[0]}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect x="6" y="5" width="2" height="4" rx="1" fill="#333333" />
        <rect x="10" y="5" width="2" height="4" rx="1" fill="#333333" />
      </svg>
    )
  },
}
