import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import './Indicator.js';
import { hour2deg, minute2deg, second2deg, computeX, computeY, perc } from './util.js';
import { color } from './settings.js';

const vm = Vue.component('Clock', {
  template: `<svg :width="width" :height="height" style="background-color:${color.bg}">
    <circle
      :cx="cx"
      :cy="cy"
      :r="r"
      fill="${color.face}" />
    <image
      :x="cx - perc(r, 25)"
      :y="cy - perc(r, 70)"
      :width="perc(r, 50)"
      :height="perc(r, 50)"
      xlink:href="logo.svg" />
    <text
      text-anchor="middle"
      :font-size="perc(r, 10)"
      :x="cx"
      :y="cy - perc(r, 20)"
      >Ewerlöf</text>
    <g>
      <Indicator
        v-for="n in 60"
        key="n"
        :cx="cx"
        :cy="cy"
        :r="r"
        :n="n"
        />
    </g>
    <g>
      <line
        :x1="computeX(cx, perc(r, -20), hourRotation)"
        :y1="computeY(cy, perc(r, -20), hourRotation)"
        :x2="computeX(cx, perc(r, 65), hourRotation)"
        :y2="computeY(cy, perc(r, 65), hourRotation)"
        stroke="${color.hour}"
        :stroke-width="r/12"/>
    </g>
    <g>
      <line
        :x1="computeX(cx, perc(r, -20), minuteRotation)"
        :y1="computeY(cy, perc(r, -20), minuteRotation)"
        :x2="computeX(cx, perc(r, 95), minuteRotation)"
        :y2="computeY(cy, perc(r, 95), minuteRotation)"
        stroke="${color.minute}"
        :stroke-width="r/16"/>
    </g>
    <g>
      <line
        :x1="computeX(cx, perc(r, -20), secondRotation)"
        :y1="computeY(cy, perc(r, -20), secondRotation)"
        :x2="computeX(cx, perc(r, 60), secondRotation)"
        :y2="computeY(cy, perc(r, 60), secondRotation)"
        stroke="${color.second}"
        :stroke-width="r/40" />
      <circle
        :cx="computeX(cx, perc(r, 63), secondRotation)"
        :cy="computeY(cy, perc(r, 63), secondRotation)"
        :r="r/12"
        fill="${color.second}" />
      <circle
        :cx="cx"
        :cy="cy"
        :r="r/20"
        fill="${color.second}" />
    </g>
  </svg>`,
  props: ['hour', 'minute', 'second', 'width', 'height'],
  methods: {
    perc, computeX, computeY
  },
  computed: {
    cx: function () {
      return this.width / 2;
    },
    cy: function () {
      return this.height / 2;
    },
    r: function () {
      return Math.min(this.width, this.height) / 2;
    },
    hourRotation: function () {
      return hour2deg(this.hour);
    },
    minuteRotation: function () {
      return minute2deg(this.minute);
    },
    secondRotation: function () {
      return second2deg(this.second);
    }
  }
});

export default vm;
