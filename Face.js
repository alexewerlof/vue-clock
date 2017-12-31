import './Indicator.js';
import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import { color } from './settings.js';
import { min2deg, perc } from './util.js';

Vue.component('Face', {
  // the big ones
  //          length={perc(r, 25)}
  //  width={perc(r, 6)}
  template: `<g>
    <circle :cx="cx" :cy="cy" :r="r" :fill="faceColor" />
    <Indicator
      v-for="n in 60"
      key="n"
      :cx="cx"
      :cy="cy"
      :r="r"
      :n="n"
      />
    </g>`,
  props: ['cx', 'cy', 'r'],
  data: function () {
    return {
      faceColor: color.face
    };
  },
  methods: {
    perc,
    min2deg
  }
});
