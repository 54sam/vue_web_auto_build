<template>
  <transition name="slide-right">
    <div v-if="sortApi.length > 0 && editShow === true">
      <el-tabs v-model="activeName">
        <el-tab-pane label="组件设置" name="first">
          <div v-for="(appUi,index) in sortApi"
               :is="appUi.component+'Edit'"
               :content="appUi.content"
               :oStyle="appUi.style"
               :editPartShow="appUi.editPartShow"
               :aIndex="index"
               :currentIndex="editIndex"
               :key="appUi.content.code">
          </div>
        </el-tab-pane>
        <el-tab-pane label="样式设置" name="second">
          <el-collapse v-model="colorPicker.name" class="base-edit" accordion>
            <el-collapse-item class=""
                              :title="colorPicker.type"
                              :name="colorPicker.type">
              <el-form ref="form"
                       :model="colorPicker"
                       size="mini">
                <div class="cui-flex">
                  <div class="cui-flex-item cui-flex cui-flex-list"
                       v-for="(item,index) in colorPicker.baseStyle"
                       :key="index">
                    <label class="el-form-item__label cui-flex-lable">
                      {{ item.title }}
                    </label>
                    <div class="cui-flex-item">
                      <el-input v-model="sortApi[editIndex].style[item.style]"
                                class="cui-input-box"
                                size="small">
                      </el-input>
                    </div>
                  </div>
                </div>
                <el-form-item class="cui-inline-reset"
                              v-for="item in colorPicker.content"
                              :label="item.title"
                              :key="item.style">
                  <el-color-picker
                    @active-change=" (value) => setStyle(value,item.style)"
                    v-model="sortApi[editIndex].style[item.style]"
                    show-alpha>
                  </el-color-picker>
                  <span class="black-text-shadow"
                        :style="{color: sortApi[editIndex].style[item.style]}">
                                        {{ sortApi[editIndex].style[item.style] }}
                                    </span>
                </el-form-item>
                <div class="cui-flex cui-clomun">
                  <div class="cui-flex-item cui-flex cui-flex-list"
                       v-for="(item,index) in colorPicker.distance"
                       :key="index">
                    <label class="el-form-item__label cui-flex-lable">{{ item.title }}</label>
                    <div class="cui-flex-item">
                      <el-input v-model="sortApi[editIndex].style[item.style]"
                                class="cui-input-box"
                                size="small">
                      </el-input>
                    </div>
                  </div>
                </div>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </div>
  </transition>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import BtnEdit from "@/components/BtnEdit.vue";
  
  export default {
    name: 'BaseEdit',
    components: {
      BtnEdit
    },
    data(){
      return {
        colorPicker: {
          type: '颜色设置',
          name: 'Picker',
          content: [
            {
              title: '背景颜色:',
              style: 'background'
            },
            {
              title: '字体颜色:',
              style: 'color'
            }
          ],
          baseStyle: [
            {
              title: '宽度:',
              style: 'width'
            },
            {
              title: '高度:',
              style: 'height'
            }
          ],
          distance: [
            {
              title: '上外边距:',
              style: 'margin-top'
            },
            {
              title: '右外边距:',
              style: 'margin-right'
            },
            {
              title: '下外边距:',
              style: 'margin-bottom'
            },
            {
              title: '左外边距:',
              style: 'margin-left'
            },
            {
              title: '上内边距:',
              style: 'padding-top'
            },
            {
              title: '右内边距:',
              style: 'padding-right'
            },
            {
              title: '下内边距:',
              style: 'padding-bottom'
            },
            {
              title: '左内边距:',
              style: 'padding-left'
            }
          ]
          
        },
        activeName: 'first'
      }
    },
    
    computed: {
      ...mapState(['editIndex', 'sortApi', 'editShow'])
    },
    methods: {
      setStyle(value, style){
        this.$set(this.sortApi[this.editIndex].style, style, value);
      }
    }
  }
</script>

<style>
  .cui-flex-lable {
    white-space: nowrap;
    display: block;
    min-width: 75px;
  }
  
  .cui-clomun {
    flex-wrap: wrap;
  }
  
  .cui-flex-list {
    align-items: center;
    margin: 0 2%;
    margin-bottom: 10px;
    width: 46%;
  }
  
  .cui-input-box input {
    display: block;
    width: 100%;
    text-align: center;
  }
  
  .slide-right-enter-active, .slide-right-leave {
    transition: all .45s ease-in-out;
    opacity: 1;
  }
  
  .slide-right-enter {
    opacity: 0;
  }
  
  .slide-right-leave-active {
    transition: all .45s ease-in-out;
    opacity: 0;
  }
  
  .el-collapse-item__content {
    padding-bottom: 0;
  }
  
  .app-right .el-color-picker--mini .el-color-picker__trigger {
    padding: 1px;
  }
  
  .app-right .el-form {
    overflow: hidden;
    padding-top: 5px;
  }
  
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 5px;
  }
  
  .app-right .el-form-item > * {
    line-height: 1;
    float: none;
    text-align: left;
  }
  
  .app-right .el-form-item__label {
    width: 80px;
    text-align: right;
  }
  
  .el-collapse-item__wrap {
    width: 100%;
  }
  
  .el-color-picker {
    vertical-align: middle;
  }
  
  .black-text-shadow {
    text-shadow: 0 0 6px rgba(0, 0, 0, 1);
    font: 12px/1 '宋体';
  }
  
  .app-right .el-tabs__header {
    margin-bottom: 0;
    background: #fff;
  }
  
  .app-right .el-tabs__header .el-tabs__nav {
    float: none;
  }
  
  .app-right .el-tabs__header .el-tabs__item {
    height: 45px;
    width: 50%;
    text-align: center;
    cursor: pointer;
  }
</style>
