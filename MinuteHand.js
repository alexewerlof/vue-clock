import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import { color } from './settings.js';
import { computeX, computeY, perc, min2deg } from './util.js';

const vm = Vue.component('MinuteHand', {
  template: `<line
    :x1="computeX(cx, perc(r, -20), rotation)"
    :y1="computeY(cy, perc(r, -20), rotation)"
    :x2="computeX(cx, perc(r, 95), rotation)"
    :y2="computeY(cy, perc(r, 95), rotation)"
    stroke="${color.minute}"
    :stroke-width="r/16"/>`,
  props: ['cx', 'cy', 'r', 'minute'],
  methods: {
    computeX, computeY, perc
  },
  computed: {
    rotation: function () {
      return min2deg(this.minute)
    }
  }
});

export default vm;
