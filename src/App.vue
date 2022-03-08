<template>
  <div
    class="
      __progress
      absolute
      bottom-0
      text-gray-600
      font-mono
      w-full
      text-center text-4xl
      p-10
    "
  >
    {{ progress }}
  </div>
  <div
    class="bg-black h-screen grid place-items-center p-10"
    @click="togglePlay"
    @dblclick="timeline.restart"
  >
    <div class="relative bg-white grid place-items-center">
      <p
        v-for="(line, i) in lines"
        class="__line absolute"
        :style="tickStyle(i)"
      />
    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import * as HSL from './hsl.js';
export default {
  name: 'App',
  data() {
    return {
      progress: '0%',
      lines: 120,
      timeline: anime.timeline({
        targets: '.__line',
        direction: 'alternate',
        loop: true,
        // autoplay: false,
      }),
    };
  },

  async mounted() {
    console.log(this.timeline);

    this.timeline.add({
      keyframes: [
        {
          translateX: (line, i, l) => {
            const tick = (2 * Math.PI) / l;
            const x = Math.sin(i * tick) * 200;
            return `calc(${Math.sin(i * tick)} * min(20vw, 20vh))`;
          },
          translateY: (line, i, l) => {
            const tick = (2 * Math.PI) / l;
            const y = -Math.cos(i * tick) * 200;
            return `calc(${-Math.cos(i * tick)}  * min(20vw, 20vh))`;
          },
          rotate: (line, i, l) => {
            const tick = 360 / l;
            const ranges = [
              () => i * tick,
              () => i * tick - 180,
              () => (i * tick) % 180,
              () => ((i * tick) % 180) - 180,
            ];
            const rangeIndex = Math.floor((i * tick) / 90);
            const angle = ranges[rangeIndex]();
            return `${angle}deg`;
          },
          duration: 800,
          delay: 800,
          endDelay: 800,
          easing: 'easeOutSine',
        },
        {
          scale: 1.5,
          duration: 30,
          delay: anime.stagger(10),
          endDelay: 0,
          easing: 'linear',
        },
        {
          scale: 1,
          duration: 300,
          endDelay: (el, i, l) => l * 10,
          easing: 'linear',
        },
        { scale: 0, duration: 800, endDelay: 800, easing: 'linear' },
      ],
      update: (anim) => {
        this.progress = `${this.timeline.progress.toFixed(0)}%`;
      },
    });

    // .add({
    //   opacity: 0.2,
    //   scale: [1, 2, 1],
    //   //   duration: 2000,
    // });

    await this.timeline.finished;
    console.log('done');
  },
  methods: {
    tickStyle(i) {
      const toHexString = (dec) => {
        const hex = dec.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
      };

      const tick = 360 / this.lines;
      const hue = tick * i;
      const saturation = 100;
      const lightness = 50;
      const rgb = HSL.toRGB([hue, saturation, lightness]);

      const background = rgb.reduce((s, c) => {
        return s + toHexString(c);
      }, '#');

      return { background };
    },
    togglePlay() {
      if (this.timeline.paused) {
        this.timeline.play();
        return;
      }
      this.timeline.pause();
    },
  },
};
</script>

<style>
.__line {
  width: 1px;
  height: min(20vw, 20vh);
}
</style>
