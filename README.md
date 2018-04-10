
>  好吧，之前的承诺还是兑现吧，因为扛不住大家的轰炸了0.0，开源了，不过只上传了基本的东西，至于项目详细的构建，还要大家自己去根据自家的项目慢慢加，这里只是一个大的框架和思路，如果喜欢，请多多给Star吧，23333333

~~~js
    # install dependencies
    npm install

    # serve with hot reload at localhost:8080
    npm run dev
~~~

## 开发准备
<strong>1、</strong>使用vue-cli，下载下来配置好的东西<br />
<strong>2、</strong>因为中间牵涉了拖拽生成组件的操作，所以使用了vuedraggable和sortablejs。<br />

**安装vuedraggable sortablejs**
~~~js
    npm install vuedraggable
    npm install sortablejs
~~~
项目中我们只需要引入vuedraggable就可以了，牵涉了sortablejs东西的时候，vuedraggable会去自己加载调用sortablejs里面的方法的，这个就不是我们需要关注的(你如果想了解，可以自己去看看)；<br />
<strong>3、</strong>安装vuex，因为里面牵涉到了大量的数据交互，很多组件都需要一些公用的数据，不使用vuex去管理，将会为开发带来更多不必要的麻烦;<br />

**安装vuex**
~~~
    npm install --save vuex
~~~
<strong>4、</strong>因为没有设计稿的缘故，所以大胆使用了第三方UI库 element-ui;<br />
[element-ui官网地址](http://element-cn.eleme.io/#/zh-CN/component/installation)<br />

**安装elememt**
~~~
 npm install element-ui
 //为什么是element-ui而不是element?因为当时npm上已经有了element包了(我当时还觉得挺有意思的，0.0 好冷啊！！！)
~~~

<strong>5、</strong>axios安装,后面与后台数据交互会用到<br />

**安装axios**
~~~
npm install --save axios
~~~

差不多准备工作就这些了，接下来我们看项目实施；

## 项目开始

### 1、各种文件的配置

#### -> main.js中文件的配置
![main.js配置](https://user-gold-cdn.xitu.io/2018/1/31/1614a96406ca720d?w=603&h=313&f=png&s=32043)
图片中都有解释，应该可以看的懂的；

#### -> 侧边栏拖拽组件数据的配置
![dragApi](https://user-gold-cdn.xitu.io/2018/1/31/1614a9ccbea95359?w=597&h=507&f=png&s=25923)
因为文件太长，所以删掉了一些，这里就是一个简单的格式，仅供参考，不作为标准；

在组件当中，存在一个布局的问题，所以要有布局组件，让组件可以放到布局组建中，这样才更加的灵活

#### -> vuexjs 状态管理中的js配置
![storejs配置](https://user-gold-cdn.xitu.io/2018/1/31/1614aa42fdce66b1?w=603&h=536&f=png&s=38154)

**说明：**<br />
1、因为用户在拖拽之后要实时保存到sessionStorage中， 所以再初始的时候要到sessionStroage中去取数据，防止突然刷新页面，还没有保存到数据库中，用户刚刚编辑的数据全部丢失的情况;<br />
2、这里说明一下，可能考虑到用于已经提交了数据，所以用户关闭窗口之后，再次进来的时候，要结合后台给出的用户之前的数据，一起存储到sessionStorage中去，相信这一点大家肯定想的到的，这里善意提醒一下 0.0；<br />
3、我这这里暂时放了四个参数，图中都有说明，我主要是将基本编辑做成了一个组件，会根据用户点击时哪个组件，而重新渲染数据给到编辑组件，从而可以实时对应到点击的组件去编辑；<br />
4、editShow的作用就是控制编辑组件显示与否的，主要删除组件的时候，让编辑组件隐藏一下；点击其他组件的显示一下；

> **基本的配置就这些了，接下来就是真正的开发了;**

---

### 2、项目开发开始

#### -> app.vue文件中该怎么写？
~~~html
<template>
    <!--用的element-ui-->
    <el-container>
        <el-aside>
            <Draggable class="app-aside-drag" :options="dragOption">
                <div class="app-aside-list" 
                    v-for="(dragList,index) in dragData" 
                    :type="dragList.type" 
                    :key="dragList.type">
                    <div class="aside-item-body">
                        <i class="aside-item-ele"></i>
                        <span class="aside-item-ele">{{ list.title }}</span>
                    </div>
                </div>
            </Draggable>
        <el-aside>
        <el-main class="app-main">
            <section class="app-phone">
                <div class="app-phone-header">
                    <span class="phone-camera"></span>
                    <span class="phone-ls"></span>
                </div>
                <!--页面view区 -->
                <Sort class="app-phone-body"></Sort>
                <div class="app-phone-footer">
                    <button class="app-phone-menu">RS</button>
                </div>
            </section>
        </el-main>
        <el-aside class="app-right">
            <!--组件编辑区域-->
            <BaseEdit></BaseEdit>
        </el-aside>
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
	    return{
	        dragData: {},
	        dragOption: {
	            group: {
	                name: 'components', //这个很重要，其他的与之能产生关联的拖拽框就靠这name 一定要一致
	                pull: 'clone',  
	                put: false
	            },
	            sort: false //默然为true。这里我们只需要他拖拽，无需能拖动排序
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
	    //这里我只写了组件的数据进来，布局的暂时没放
	    this.dragData = DragApi.configList[1].content;
	}
}

</script>
~~~

#### -> 来看看sort view视图区域组件
~~~
<template>
    <Draggable :options="sortOption"
        @sort="onSort"
        @add="onAdd"
        class="app-sort">
        <!-- ui组件 -->
        <!--这里不懂的人，可以去vue官网看看动态组件-->
        <div v-for="(appUi,index) in sortApi" //循环组件
             :is="appUi.component" //根据存在的组件渲染出来
             :content="appUi.content"
             :oStyle="appUi.style"
             :editPartShow="appUi.editPartShow"
             :aIndex="index"
             //组件想要点击生效，只需要@click.native就行了
             @click.native="getIndex(index)"
             //key值一定要给出来，不然相同组件的排序可能会不成功
             :key="appUi.content.code">
        </div>
    </Draggable>
</template>
<script>
    //利用vuex 辅助函数来操作vuexjs中的数据
    import { mapState,mapMutations } from 'vuex';
    //拖拽插件引入
    import Draggable from 'vuedraggable';
    //各个组件引入
    import Carousel from "@/components/Carousel.vue";
    import Btn from "@/components/Btn.vue";

    export default {
        name: 'Sort',
        components: {
            Draggable,Btn,Carousel
        },
        data(){
            return {
                sortOption: {
                    group: {
                      name: 'components', //前面说的name,在这里就起了作用，不一样，是不能放入的
                      pull: true,
                      put: true
                    },
                    sort: true,
                    animation: 300 //给了个动画，看起来舒服些
                }
            }
        },
        computed:{
            ...mapState(['editIndex','sortApi']),
        },
        watch:{
            sortApi:{
                handler(newVal,oldVal){
                    window.sessionStorage.setItem('localData',JSON.stringify(newVal));
                },
                deep: true
            }
        },
        methods:{
            ...mapMutations(['sortCp','addCp','setStyle','setCommon']),
            onSort(res){ //排序产生的事件
                if(res.from === res.to){
                    this.sortCp(res);
                }
            },
            onAdd(res){//组件增加产生的事件
                this.addCp(res);
            },
            getIndex(index){
               this.setCommon({index: index,flag: true});
            }
        }
    }
</script>
~~~

#### -> 再来看看编辑组件

~~~
<template>
    <transition name="slide-right">
        <div v-if="sortApi.length > 0 && editShow === true">
            //组件特有编辑
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
                    //公共样式编辑
                    <el-collapse v-model="colorPicker.name" class="base-edit"  accordion>
                        <el-collapse-item class="tititt" :title="colorPicker.type" :name="colorPicker.type">
                            <el-form ref="form" :model="colorPicker" size="mini">
                                <el-form-item class="cui-inline-reset"
                                    v-for="(item,index) in colorPicker.content"
                                    :label="item.title"
                                    :key="item.style">
                                    <el-color-picker
                                        //在element-ui框架中，有很多@change @active-change事件，直接写事件发现不能传入参数，
                                        //当然，办法总比问题多，我们换成一下这种写法就行了，他的默然参数写在前面
                                        //这里颜色拾取器 返回的是实时的颜色值
                                        //我这里主要想传一个对应的style
                                        @active-change=" (value) => setStyle(value,item.style)"
                                        v-model="sortApi[editIndex].style[item.style]"
                                        show-alpha>
                                    </el-color-picker>
                                    <span class="black-text-shadow"
                                        :style="{color: sortApi[editIndex].style[item.style]}">
                                        {{ sortApi[editIndex].style[item.style] }}
                                    </span>
                                </el-form-item>
                            </el-form>
                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
            </el-tabs>
        </div>
    </transition>
</template>
<script>
    import { mapState,mapMutations } from 'vuex';
    //这里我将组建特有的编辑栏，写成了一个组件，为什么不写在相应的组件一起了？
    //这里必须说明一下，主要是我没有想到方法，让他在同一组件内分离出来，单独将dom结构放在编辑栏这里，如果有大神知道
    //还望不吝赐教
    import BtnEdit from "@/components/BtnEdit.vue";
    
    export default{
        name: 'BaseEdit',
        components: {
          BtnEdit
        },
        data(){
            return{
                colorPicker: {
                    type: '颜色设置',
                    name: 'Picker',
                    content:[
                        {
                            title: '背景颜色',
                            style: 'background'
                        },
                        {
                            title: '字体颜色',
                            style: 'color'
                        }
                    ]
                    
                },
                activeName: 'first'
            }
        },
        
        computed:{
            ...mapState(['editIndex','sortApi','editShow'])
        },
        methods:{
            setStyle(value,style){
                //根据上面传入的style属性，实时改变现有的值
                this.$set(this.sortApi[this.editIndex].style,style,value);
            }
        }
    }
</script>
~~~

#### -> 选出一个组件来看看里面是怎么配置的

~~~html
//按钮组件，其实里面很简单
//组件的对应的编辑组件，里面内容和这个也差不多，下面就不写了
<template>
    <div class="btn-box ui-sortable" :data-code="content.code">
        <el-button class="ui-btn"
            :style="oStyle">
            {{ content.text }}
        </el-button>
        //因为每个组件都有删除功能，所以写成了一个组件
        <DeleteCp :aIndex="aIndex"></DeleteCp>
    </div>
</template>
<script>
    import DeleteCp from "@/components/DeleteCp";
    export default {
        name: 'Btn',
        props: { //父组件传入的参数
            content: Object,
            oStyle: Object,
            aIndex: Number
        },
        components: {
            DeleteCp
        },
        data(){
            return{
                btnModel: 'btn-model'
            }
        }
    }
</script>

~~~

#### ->最后来看看删除组件吧

~~~
<template>
    <div class="delete-compontent-box">
        <div class="el-icon-delete remove-component" @click.stop="dailogStatu"></div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :append-to-body="appendToBody"
            width="430px">
            <div class="el-message-box__content">
                <div class="el-message-box__status el-icon-warning"></div>
                <div class="el-message-box__message dialog-message">此操作将删除该模块, 是否继续?</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="onRemove(aIndex)" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapMutations } from "vuex";
    export default {
        name: 'oText',
        props: {
            aIndex: Number
        },
        data(){
            return{
                //这两个参数是弹框的参数
                dialogVisible: false,
                appendToBody: true 
            }
        },
        methods:{
            ...mapMutations(['deleteCp','setCommon']),
            dailogStatu(){
            //主要是控制弹窗出来，并且显示该组件对应的编辑栏
              this.dialogVisible = true;
              this.setCommon({flag: true,index: this.aIndex})
            },
            onRemove(index){
                //点击确定删除对应的组件
                let flag = false;
                this.deleteCp(index);
                this.dialogVisible = false;
                this.$message({
                    message: '该模块已删除 !',
                    type: 'success'
                });
                this.setCommon({flag: false,index: 0})
            }
        }
    }
</script>
~~~
---
#### -> 来看看效果图吧

![效果图展示](https://user-gold-cdn.xitu.io/2018/1/31/1614b081bf7378d8?w=919&h=608&f=gif&s=1646270)

## 结束语

好了，今天写了很多了，最后我们来梳理一下思路：

1、首先配置左侧的拖拽组件<br />
2、配置vuex中的数据<br />
3、app.vue中配置<br />
4、编辑组件的配置<br />
5、各种数据的传递与依赖

其实每个项目，都需要一个清晰的路线，这样才能很好的开发下去，所以我的建议是，在拿到项目的时候，千万不要一股脑的去写，一定要想好怎么做，以及突发事情的发生(比如突来的需求变更)，这样既方便了我们自己，也方便了后来维护的人，也阻止了不必要的麻烦

谢谢大家的耐心的阅读，毕竟这只是一个大概的介绍，肯定存在很多不足，如果大家有建议，欢迎留言交流

最后：欢迎大家关注我的个人公众号：**大前端js**，当然为了回馈大家关注，里面我放了一些学习资源，热烈欢迎大家关注交流前端方面但不局限前端方面的知识；

> **原创不易，转载时请注明出处与原文链接，谢谢！**