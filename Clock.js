import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import './Indicator.js';
import { hour2degF, minute2degF, second2degF, Poly } from './util.js';
import { color } from './settings.js';

const vm = Vue.component('Clock', {
  template: `<svg :width="width" :height="height" style="background-color:${color.bg}">
    <circle
      :cx="poly.cx"
      :cy="poly.cy"
      :r="poly.r"
      fill="${color.face}" />
    <image
      :x="poly.cx - poly.R(25)"
      :y="poly.cy - poly.R(70)"
      :width="poly.R(50)"
      :height="poly.R(50)"
      xlink:href="logo.svg" />
    <text
      text-anchor="middle"
      :font-size="poly.R(10)"
      :x="poly.cx"
      :y="poly.cy - poly.R(20)"
      fill="${color.hour}"
      >Ewerlöf</text>
    <path id="MadeInSwedenCurve"
      :d="poly.cmdXY('M', -165, 102) + poly.cmdXY(' Q', -180, 104) + ' ' + poly.XY(165, 102)" stroke="transparent" fill="transparent"/>
    <text :font-size="poly.R(6)" text-anchor="middle">
      <textPath xlink:href="#MadeInSwedenCurve" startOffset="50%" fill="${color.hour}">
        Made in Sweden
      </textPath>
    </text>
    <g>
      <Indicator
        v-for="n in 60"
        key="n"
        :cx="poly.cx"
        :cy="poly.cy"
        :r="poly.r"
        :n="n"
        />
    </g>
    <g>
      <line
        :x1="poly.X(hourRot, -20)"
        :y1="poly.Y(hourRot, -20)"
        :x2="poly.X(hourRot, 65)"
        :y2="poly.Y(hourRot, 65)"
        stroke="${color.hour}"
        :stroke-width="poly.R(8.3)"/>
    </g>
    <g>
      <line
        :x1="poly.X(minRot, -20)"
        :y1="poly.Y(minRot, -20)"
        :x2="poly.X(minRot, 95)"
        :y2="poly.Y(minRot, 95)"
        stroke="${color.minute}"
        :stroke-width="poly.R(6.25)"/>
    </g>
    <g>
      <line
        :x1="poly.X(secRot, -20)"
        :y1="poly.Y(secRot, -20)"
        :x2="poly.X(secRot, 60)"
        :y2="poly.Y(secRot, 60)"
        stroke="${color.second}"
        :stroke-width="poly.R(2)" />
      <circle
        :cx="poly.X(secRot, 63)"
        :cy="poly.Y(secRot, 63)"
        :r="poly.R(8)"
        fill="${color.second}" />
      <circle
        :cx="poly.cx"
        :cy="poly.cy"
        :r="poly.R(5)"
        fill="${color.second}" />
    </g>
  </svg>`,
  props: ['hour', 'minute', 'second', 'width', 'height'],
  computed: {
    poly() {
      const cx = this.width / 2;
      const cy = this.height / 2;
      const r = Math.min(this.width, this.height) / 2;
      return new Poly(cx, cy, r);
    },
    hourRot() {
      return hour2degF(this.hour, 5);
    },
    minRot() {
      return minute2degF(this.minute, 12);
    },
    secRot() {
      return second2degF(this.second, 30);
    }
  }
});

export default vm;
