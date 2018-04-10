<template>
  <el-container id="app">
    <el-header class="app-header">
      头部
    </el-header>
    <el-container class="app-container">
      <el-aside class="app-aside">
        <div class="aside-list" v-for="(config,index) in dragData" :key="index">
          <el-breadcrumb class="aside-header">
            {{ config.title }}
          </el-breadcrumb>
          <Draggable
            :options="dragOption"
            class="aside-body">
            <div v-for="(list,index) in config.content"
                 class="aside-item"
                 :class="list.class"
                 :type="list.type"
                 :key="index">
              <div class="aside-item-body">
                <i class="aside-item-ele"></i>
                <span class="aside-item-ele">{{ list.title }}</span>
              </div>
            </div>
          </Draggable>
        </div>
      </el-aside>
      <el-main class="app-main">
        <section class="app-phone">
          <div class="app-phone-header">
            <span class="phone-camera"></span>
            <span class="phone-ls"></span>
          </div>
          <Sort class="app-phone-body"></Sort>
          <div class="app-phone-footer">
            <button class="app-phone-menu">RS</button>
          </div>
        </section>
      </el-main>
      <el-aside class="app-right">
        <BaseEdit></BaseEdit>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
  
  import DragApi from "@/dragapi/dragapi.js";
  import Draggable from "vuedraggable";
  import Sort from "@/view/Sort";
  import BaseEdit from "@/view/BaseEdit";
  
  export default {
    name: 'app',
    data(){
      return {
        dragData: {},
        dragOption: {
          group: {
            name: 'components',
            pull: 'clone',
            put: false
          },
          sort: false
        }
      }
    },
    components: {
      Draggable,
      Sort,
      BaseEdit
    },
    created(){
      //侧边栏拖拽列表数据
      this.dragData = DragApi.configList;
    },
    methods: {
      onStart(res){
      
      }
    }
  }
</script>

<style>
  .app-header {
    position: relative;
    height: 60px !important;
    background: #393D49;
    line-height: 60px;
    color: #f1f1f1;
    font-size: 18px;
    box-shadow: 0 0 1px rgb(256, 256, 256);
    z-index: 10;
  }
  
  .app-container {
    height: calc(100vH - 60px);
    background: #f1f1f1;
    overflow: hidden;
  }
  
  /*>------左侧边栏内容开始<------*/
  .app-aside {
    position: relative;
    width: 250px !important;
    height: 100%;
    background: #393D49;
  }
  
  .aside-list {
    border-bottom: 1px solid #999;
  }
  
  .aside-header,
  .app-right .el-collapse-item .el-collapse-item__header,
  .app-right .el-collapse-item.is-active .el-collapse-item__header {
    position: relative;
    height: 45px;
    line-height: 45px;
    color: #F56C6C;
    padding: 0 15px;
    border-bottom: 1px solid #999;
    transition-duration: 300ms;
  }
  
  .app-right .el-collapse-item .el-collapse-item__header {
    color: #333;
  }
  
  .aside-header:before,
  .app-right .el-collapse-item .el-collapse-item__header:before,
  .app-right .el-collapse-item.is-active .el-collapse-item__header:before {
    content: '';
    position: absolute;
    display: block;
    left: 6px;
    width: 4px;
    top: 13px;
    bottom: 13px;
    background: #F56C6C;
    border-radius: 10px;
    transform: scaleX(.8);
    transition-duration: 300ms;
  }
  
  .app-right .el-collapse-item .el-collapse-item__header:before {
    background: #333;
  }
  
  .aside-body {
    font-size: 0;
    padding: 10px 0;
    background: transparent;
  }
  
  .aside-item {
    position: relative;
    width: 31%;
    display: inline-block;
    font-size: 16px;
    margin-left: 1.6%;
    margin-top: 1.6%;
    padding-bottom: 31%;
    height: 0;
    background: #01AAED;
    text-align: center;
    vertical-align: middle;
    color: #fff;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    opacity: 1;
  }
  
  .aside-item.sortable-chosen {
    opacity: .8;
  }
  
  .aside-item.sortable-ghost {
    opacity: .8;
  }
  
  .aside-item-body {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  
  .aside-item-ele {
    position: relative;
    display: block;
    width: 100%;
  }
  
  /*>------左侧边栏内容结束------<*/
  
  /*>------中间内容开始------<*/
  .app-main {
    position: relative;
    background: #393D49;
    box-shadow: inset 0 0 10px rgb(255, 255, 255);
    z-index: 10;
  }
  
  .app-phone {
    position: relative;
    flex-direction: column;
    width: 20vW;
    height: calc(20vW * 16 / 9);
    max-width: 420px;
    max-height: 750px;
    min-width: 300px;
    min-height: 555px;
    background: #f1f1f1;
    border-radius: 10px;
    border: 2px solid #000;
    left: 50%;
    top: 50%;
    overflow: hidden;
    transform: translate(-50%, -50%);
  }
  
  .app-phone-header {
    position: relative;
    height: 30px;
    background: #000;
    font-size: 0;
    text-align: center;
    line-height: 30px;
  }
  
  .phone-ls {
    display: inline-block;
    width: 50px;
    height: 5px;
    background: #000;
    line-height: 1;
    vertical-align: middle;
    border-radius: 10px;
    box-shadow: inset 0 0 2px #999;
  }
  
  .phone-camera {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    margin-right: 5px;
    border-radius: 10px;
    right: 30px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  
  .app-phone-body {
    height: calc(100% - 70px);
  }
  
  .app-phone-footer {
    height: 40px;
    background: #000;
    text-align: center;
    line-height: 40px;
    font-size: 0;
  }
  
  .app-phone-menu {
    background: #000;
    border-color: #000;
    box-shadow: inset 0 0 5px #999;
    padding: 6px 16px;
    color: #999;
    border-radius: 80px;
    transition-duration: 100ms;
    font-size: 12px;
    vertical-align: middle;
    cursor: pointer;
  }
  
  .app-phone-menu:hover {
    background: #333;
    border-color: #000;
  }
  
  .app-phone-menu:active {
    background: #000;
    border-color: #000;
  }
  
  /*>------中间内容结束------<*/
  
  /*>------右侧边栏内容开始------<*/
  .app-right {
    width: 320px !important;
    background: #393D49;
  }
  
  /*>------右侧边栏内容结束------<*/

</style>
