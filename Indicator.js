import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import { color } from './settings.js';
import { computeX, computeY, perc, min2deg } from './util.js';

const vm = Vue.component('Indicator', {
  template: `<line
    :x1="computeX(cx, r - length, rotation)"
    :y1="computeY(cy, r - length, rotation)"
    :x2="computeX(cx, perc(r, 95), rotation)"
    :y2="computeY(cy, perc(r, 95), rotation)"
    stroke="${color.indicator}"
    :stroke-width="big ? perc(this.r, 6) : perc(this.r, 2)" />`,
  props: ['cx', 'cy', 'r', 'n'],
  methods: {
    computeX, computeY, perc
  },
  computed: {
    big: function () {
      return this.n % 5 === 0;
    },
    length: function () {
      return perc(this.r, this.big ? 28 : 12);
    },
    rotation: function () {
      return min2deg(this.n);
    }
  }
});

export default vm;
