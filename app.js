import Vue from './node_modules/vue/dist/vue.esm.browser.js';
import './Clock.js';

let intervalId;

const vm = new Vue({
    el: '#app',
    mounted: function () {
        tick();
    },
    beforeDestroy: function () {
        clearInterval(intervalId);
    },
    template: `<Clock :hour="hour" :minute="minute" :second="second" />`,
    data: {
        hour: 0,
        minute: 0,
        second: 0
    }
});

function updateTime() {
    const now = new Date();
    const second = now.getSeconds() + now.getMilliseconds() / 1000;
    const minute = now.getMinutes() + second / 60;
    const hour = now.getHours() + minute / 60;
    vm.hour = hour;
    vm.minute = minute;
    vm.second = second;
}

function tick() {
    intervalId = requestAnimationFrame(() => {
        updateTime();
        tick();
    });
}
