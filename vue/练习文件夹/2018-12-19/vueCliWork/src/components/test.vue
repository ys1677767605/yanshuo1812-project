<template>
     <div class="slider">
                <div class="progress" :style="{width:value + '%'}">
                        <div class="btn1" @mousedown.left.stop="mouseDown"></div>
                </div>
                
            </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0
    };
  },
  watch: {
    value(val) {
      this.value = Math.round(val / 5) * 5;
      if (val > 100) this.value = 100;
      if (val < 0) this.value = 0;
    }
  },
  methods: {
    mouseDown() {
      //console.dir 可以获取元素内部属性
      console.dir(this.$el);
      const width = this.$el.clientWidth;
      const offsetLeft = this.$el.offsetLeft;
      const move = e => {
        const x = e.clientX;
        this.value = (x - offsetLeft) / width * 100;
      };
      const up = e => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    }
  }
};
</script>

<style scoped>
.slider {
  width: 800px;
  height: 10px;
  background: #ccc;

  border-radius: 5px;
}
.slider .progress {
  height: inherit;
  width: 0%;
  background: red;
  position: relative;
}
.slider .btn1 {
  width: 16px;
  height: 16px;
  border-radius: 10px;
  border: 3px solid orangered;
  position: absolute;
  top: -5px;
  right: -15px;
  background: #fff;
}
</style>