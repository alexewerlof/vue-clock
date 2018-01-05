import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import './Indicator.js';
import { hour2deg, minute2deg, second2deg, computeX, computeY } from './util.js';
import { color } from './settings.js';

const vm = Vue.component('Clock', {
  template: `<svg :width="width" :height="height" style="background-color:${color.bg}">
    <circle
      :cx="cx"
      :cy="cy"
      :r="r"
      fill="${color.face}" />
    <image
      :x="cx - per(25)"
      :y="cy - per(70)"
      :width="per(50)"
      :height="per(50)"
      xlink:href="logo.svg" />
    <text
      text-anchor="middle"
      :font-size="per(10)"
      :x="cx"
      :y="cy - per(20)"
      fill="${color.hour}"
      >Ewerlöf</text>
    <path id="MadeInSwedenCurve"
      :d="'M ' + comXY(102, -165) + ' Q' + comXY(104, -180) + ' ' + comXY(102, 165)" stroke="transparent" fill="transparent"/>
    <text :font-size="per(6)" text-anchor="middle">
      <textPath xlink:href="#MadeInSwedenCurve" startOffset="50%" fill="${color.hour}">
        Made in Sweden
      </textPath>
    </text>
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
        :x1="comX(-20, hourRotation)"
        :y1="comY(-20, hourRotation)"
        :x2="comX(65, hourRotation)"
        :y2="comY(65, hourRotation)"
        stroke="${color.hour}"
        :stroke-width="r/12"/>
    </g>
    <g>
      <line
        :x1="comX(-20, minuteRotation)"
        :y1="comY(-20, minuteRotation)"
        :x2="comX(95, minuteRotation)"
        :y2="comY(95, minuteRotation)"
        stroke="${color.minute}"
        :stroke-width="r/16"/>
    </g>
    <g>
      <line
        :x1="comX(-20, secondRotation)"
        :y1="comY(-20, secondRotation)"
        :x2="comX(60, secondRotation)"
        :y2="comY(60, secondRotation)"
        stroke="${color.second}"
        :stroke-width="per(2)" />
      <circle
        :cx="comX(63, secondRotation)"
        :cy="comY(63, secondRotation)"
        :r="per(8)"
        fill="${color.second}" />
      <circle
        :cx="cx"
        :cy="cy"
        :r="per(5)"
        fill="${color.second}" />
    </g>
  </svg>`,
  props: ['hour', 'minute', 'second', 'width', 'height'],
  methods: {
    // Returns a percentage of the r
    per(percentage = 100) {
      return this.r * percentage / 100;
    },
    // Compute X based on the current cx and r
    comX(rPercentage, rotationDeg) {
      return computeX(this.cx, this.per(rPercentage), rotationDeg);
    },
    // Compute Y based on the current cy and r
    comY(rPercentage, rotationDeg) {
      return computeY(this.cy, this.per(rPercentage), rotationDeg);
    },
    comXY(rPercentage, rotationDeg) {
      return this.comX(rPercentage, rotationDeg) + ' ' + this.comY(rPercentage, rotationDeg);
    }
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
