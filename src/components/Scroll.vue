<template>
  <div class="better-scroll-box" :data-code="content.code" ref="scrollbox">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
  
  export default {
    name: 'Scroll',
    data(){
      return {}
    },
    mounted(){
      this.$nextTick(() =>{
        let scrollBox = this.$refs.scrollbox;
        
        this.BScrollBox = new BScroll(scrollBox, {
          probeType: 3,
          click: true,
          scrollbar: true,
          scrollfree: true,
        })
      })
    }
  }
</script>

<style scoped>
  .better-scroll-box {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
</style>
