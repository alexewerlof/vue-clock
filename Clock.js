import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import './Indicator.js';
import './HourHand.js';
import './MinuteHand.js';
import './SecondHand.js';
import { perc } from './util.js';
import { color } from './settings.js';

const vm = Vue.component('Clock', {
  template: `<svg :width="width" :height="height">
    <defs>
      <filter id="hourShadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" :dy="perc(r, 1)" stdDeviation="3" floodColor="${color.shadowColor}" floodOpacity="0.5" />
      </filter>
      <filter id="minuteShadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" :dy="perc(r, 2)" stdDeviation="3" floodColor="${color.shadowColor}" floodOpacity="0.5" />
      </filter>
      <filter id="secondShadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" :dy="perc(r, 4)" stdDeviation="3" floodColor="${color.shadowColor}" floodOpacity="0.5" />
      </filter>
    </defs>
    <circle
      :cx="cx"
      :cy="cy"
      :r="r"
      fill="${color.face}" />
    <Indicator
      v-for="n in 60"
      key="n"
      :cx="cx"
      :cy="cy"
      :r="r"
      :n="n"
      />
    <HourHand :cx="cx" :cy="cy" :r="r" :hour="hour" filter="url(#hourShadow)" />
    <MinuteHand :cx="cx" :cy="cy" :r="r" :minute="minute" filter="url(#minuteShadow)" />
    <SecondHand :cx="cx" :cy="cy" :r="r" :second="second" filter="url(#secondShadow)" />
  </svg>`,
  props: ['hour', 'minute', 'second'],
  methods: {
    perc
  },
  computed: {
    width: function () {
      return document.body.clientWidth;
    },
    height: function () {
      return document.body.clientHeight;
    },
    cx: function () {
      return this.width / 2;
    },
    cy: function () {
      return this.height / 2;
    },
    r: function () {
      return Math.min(this.width, this.height) / 2;
    }
  }
});

export default vm;
