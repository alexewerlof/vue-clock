import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import './Face.js';
import './HourHand.js';
import './MinuteHand.js';
import './SecondHand.js';
import { perc } from './util.js';
import { color } from './settings.js';

const vm = Vue.component('Clock', {
  template: `<svg :width="width" :height="height" :style="{margin: margin}">
    <defs>
      <filter id="hourShadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" :dy="perc(r, 1)" stdDeviation="3" :floodColor="shadowColor" floodOpacity="0.5" />
      </filter>
      <filter id="minuteShadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" :dy="perc(r, 2)" stdDeviation="3" :floodColor="shadowColor" floodOpacity="0.5" />
      </filter>
      <filter id="secondShadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" :dy="perc(r, 4)" stdDeviation="3" :floodColor="shadowColor" floodOpacity="0.5" />
      </filter>
    </defs>
    <Face :cx="cx" :cy="cy" :r="r" />
    <HourHand :cx="cx" :cy="cy" :r="r" :hour="hour" filter="url(#hourShadow)" />
    <MinuteHand :cx="cx" :cy="cy" :r="r" :minute="minute" filter="url(#minuteShadow)" />
    <SecondHand :cx="cx" :cy="cy" :r="r" :second="second" filter="url(#secondShadow)" />
  </svg>`,
  props: ['hour', 'minute', 'second'],
  data: function () {
    return {
      margin: 20,
      shadowColor: color.shadowColor
    }
  },
  methods: {
    perc
  },
  computed: {
    width: function () {
      return document.body.clientWidth - this.margin * 2;
    },
    height: function () {
      return document.body.clientHeight - this.margin * 2;
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
