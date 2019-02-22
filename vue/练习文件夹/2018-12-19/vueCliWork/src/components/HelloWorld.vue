<template>
    <div class="slider">
              <div class="divs"></div>
              <div class="divs2" ref="divs2" style="width:0px;"></div>
              <div class="circle" @mousedown="move()" ref="circle" style="position:absolute;left:0;"></div>
           </div>
</template>

<script>
export default {
   
            methods: {
                move() {
                    console.log(this.$refs.divs2.style.width);
                    var circle = this.$refs.circle;
                    var divX = event.clientX - parseInt(circle.style.left);
                    this.$el.onmousemove = () => {
                        circle.style.left = event.clientX - divX + 'px';
                        this.$refs.divs2.style.width = parseInt(circle.style.left) + 'px';
                    }

                    this.$el.onmouseup = () => {
                        this.$el.onmousemove = null;
                    }
                }
                
}
}
</script>
 <style scoped>
 .slider {
            width: 300px;
            height: 200px;
            margin: 20px 0 0 300px;
            background: #dddddd;
            position: relative;
        }

        .slider .divs {
            width: 300px;
            height: 2px;
            background: rgb(180, 178, 178);
            position: relative;
            top: 30px;
        }

        .slider .divs2 {
            width: 0px;
            height: 2px;
            background: rgb(86, 53, 129);
            position: absolute;
            top: 30px;
        }

        .slider .circle {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 2px solid rgb(86, 53, 129);
            background: #dddddd;
            position: absolute;
            top: 25px;
            left: 0;
        }
</style>
