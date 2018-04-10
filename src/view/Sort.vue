<template>
  <Draggable :options="sortOption"
             @sort="onSort"
             @add="onAdd"
             class="app-sort">
    <!-- ui组件 -->
    <div v-for="(appUi,index) in sortApi"
         :is="appUi.component"
         :content="appUi.content"
         :oStyle="appUi.style"
         :editPartShow="appUi.editPartShow"
         :aIndex="index"
         @click.native="getIndex(index)"
         :key="appUi.content.code">
    </div>
  </Draggable>
</template>
<script>
  
  import { mapState, mapMutations } from 'vuex';
  import Draggable from 'vuedraggable';
  import BaseEdit from "@/view/BaseEdit";
  import List from "@/components/List.vue";
  import Carousel from "@/components/Carousel.vue";
  import Img from "@/components/Img.vue";
  import Nav from "@/components/Nav.vue";
  import Btn from "@/components/Btn.vue";
  import oHeader from "@/components/Header.vue";
  import oText from "@/components/Text.vue";
  
  export default {
    name: 'Sort',
    components: {
      Draggable, Btn, List, Carousel, Img, Nav, oText, BaseEdit, oHeader
    },
    data(){
      return {
        sortOption: {
          group: {
            name: 'components',
            pull: true,
            put: true
          },
          sort: true,
          animation: 300
        }
      }
    },
    computed: {
      ...mapState(['editIndex', 'sortApi']),
    },
    watch: {
      sortApi: {
        handler(newVal, oldVal){
          window.sessionStorage.setItem('localData', JSON.stringify(newVal));
        },
        deep: true
      }
    },
    methods: {
      ...mapMutations(['sortCp', 'addCp', 'setStyle', 'setCommon']),
      onSort(res){
        if (res.from === res.to){
          this.sortCp(res);
        }
      },
      onAdd(res){
        this.addCp(res);
      },
      getIndex(index){
        this.setCommon({index: index, flag: true});
      }
    }
  }
</script>

<style>
  .app-sort {
    overflow-y: auto;
  }
  
  .ui-sortable {
    position: relative;
  }
  
  .remove-component {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
