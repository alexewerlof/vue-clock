import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import { color } from './settings.js';
import { computeX, computeY, perc, hour2deg } from './util.js';

const vm = Vue.component('HourHand', {
  template: `<line
    :x1="computeX(cx, perc(r, -20), rotation)"
    :y1="computeY(cy, perc(r, -20), rotation)"
    :x2="computeX(cx, perc(r, 65), rotation)"
    :y2="computeY(cy, perc(r, 65), rotation)"
    :stroke="hourColor"
    :stroke-width="r/12"/>`,
  props: ['cx', 'cy', 'r', 'hour'],
  methods: {
    computeX, computeY, perc
  },
  data: function () {
    return {
      hourColor: color.hour,
    }
  },
  computed: {
    rotation: function () {
      return hour2deg(this.hour)
    }
  }
});

export default vm;

