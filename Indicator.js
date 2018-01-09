import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import { color } from './settings.js';
import { Poly, minute2deg } from './util.js';

const vm = Vue.component('Indicator', {
  template: `<line
    :x1="poly.X(rotation, length)"
    :y1="poly.Y(rotation, length)"
    :x2="poly.X(rotation, 95)"
    :y2="poly.Y(rotation, 95)"
    stroke="${color.indicator}"
    :stroke-width="poly.R(width)" />`,
  props: ['cx', 'cy', 'r', 'n'],
  computed: {
    poly() {
      return new Poly(this.cx, this.cy, this.r);
    },
    big() {
      return this.n % 5 === 0;
    },
    length() {
      return this.big ? 72 : 88;
    },
    width() {
      return this.big ? 6 : 2
    },
    rotation() {
      return minute2deg(this.n);
    }
  }
});

export default vm;
