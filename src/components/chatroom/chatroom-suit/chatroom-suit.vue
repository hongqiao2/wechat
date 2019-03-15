<<<<<<< HEAD
<template>
  <transition name="slide">
    <div class="chatroom-complain" ref="content">
      <yd-navbar title="投诉建议">
          <router-link to="/chatroom/complain" slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
      </yd-navbar> 
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助"></yd-textarea>
      </yd-cell-item>
      <div class="suit-upload">
        <p>图片上传（选填，提供问题截图）</p>
        <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    components: { },
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    computed: {},
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>

<style>
.chatroom-complain{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #F8F8F8;
  }
 .yd-cell-item{
     background: #fff;
 }
 .yd-textarea>textarea{
    font-size: 0.28rem;
 }
 .suit-upload{
    background: #fff;
    margin-top: 0.3rem;
    padding: 0.2rem 0.3rem;
 }
</style>
=======
<template>
  <transition name="slide">
    <div class="chatroom-complain" ref="content">
      <yd-navbar title="投诉建议">
          <router-link to="/chatroom/complain" slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
      </yd-navbar> 
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助"></yd-textarea>
      </yd-cell-item>
      <div class="suit-upload">
        <p>图片上传（选填，提供问题截图）</p>
        <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    components: { },
    data () {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    computed: {},
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>

<style>
.chatroom-complain{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #F8F8F8;
  }
 .yd-cell-item{
     background: #fff;
 }
 .yd-textarea>textarea{
    font-size: 0.28rem;
 }
 .suit-upload{
    background: #fff;
    margin-top: 0.3rem;
    padding: 0.2rem 0.3rem;
 }
</style>
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
