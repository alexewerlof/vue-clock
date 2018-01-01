import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import { color } from './settings.js';
import { computeX, computeY, perc, sec2deg } from './util.js';

const vm = Vue.component('SecondHand', {
  template: `<g filter={filter}>
  <line
    :x1="computeX(cx, perc(r, -20), rotation)"
    :y1="computeY(cy, perc(r, -20), rotation)"
    :x2="computeX(cx, perc(r, 60), rotation)"
    :y2="computeY(cy, perc(r, 60), rotation)"
    stroke="${color.second}"
    :stroke-width="r/40" />
  <circle
    :cx="computeX(cx, perc(r, 63), rotation)"
    :cy="computeY(cy, perc(r, 63), rotation)"
    :r="r/12"
    fill="${color.second}" />
  <circle
    :cx="cx"
    :cy="cy"
    :r="r/20"
    fill="${color.second}" />
  </g>`,
  props: ['cx', 'cy', 'r', 'second'],
  methods: {
    computeX, computeY, perc
  },
  computed: {
    length: function () {
      return perc(this.r, 12);
    },
    rotation: function () {
      return sec2deg(this.second);
    }
  }
});

export default vm;
