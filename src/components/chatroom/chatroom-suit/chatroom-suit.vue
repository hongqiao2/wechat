<template>
  <transition name="slide">
    <div class="chatroom-complain" ref="content">
      <yd-navbar title="投诉建议">
          <router-link to="" @click.native="back"  slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
      </yd-navbar> 
      <yd-cell-item>
        <yd-textarea slot="right" placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助"></yd-textarea>
      </yd-cell-item>
      <div class="suit-upload">
        <p>图片上传（选填，提供问题截图）</p>
        <ul class="clearfix">
          <li v-if="imgs.length>0" v-for='(item ,index ) in imgs'>
              <img :src="item">
          </li>
          <li class="suit-upload-img" style="position:relative" v-if="imgs.length>=6 ? false : true">
              <img src="../../../assets/chatroom/addphtoto.png"><input class="upload" @change='add_img'  type="file">
          </li>
        </ul>
      </div>
      <div class="suit-btn">
        <yd-button size="large" bgcolor="#8D66FA" color="#FFF">提交</yd-button>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    components: { },
    data () {
      return {
        imgs: [],
        imgData: {
            accept: 'image/gif, image/jpeg, image/png, image/jpg',
        }

      }
    },
    computed: {},
    methods: {
      add_img(event){  
        let reader =new FileReader();
        let img1=event.target.files[0];
        let type=img1.type;//文件的类型，判断是否是图片
        let size=img1.size;//文件的大小，判断图片的大小
        if(this.imgData.accept.indexOf(type) == -1){
            alert('请选择我们支持的图片格式！');
            return false;
        }
        if(size>3145728){
            alert('请选择3M以内的图片！');
            return false;
        }
        var uri = ''
        let form = new FormData(); 
        form.append('file',img1,img1.name);
        this.$http.post('/file/upload',form,{
            headers:{'Content-Type':'multipart/form-data'}
        }).then(response => {
            console.log(response.data)
            uri = response.data.url
            reader.readAsDataURL(img1);
            var that=this;
            reader.onloadend=function(){
                that.imgs.push(uri);
            }
        }).catch(error => {
            alert('上传图片出错！');
        })    
      },
      back () {
        this.$router.back()   // 返回上一级
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
    margin-top: 0.2rem;
    padding: 0.2rem 0.3rem;
 }
 .suit-upload p{
   font-size: 0.28rem;
   color: #383838;
   margin-bottom: 0.2rem;
 }
 .suit-upload-img img{
    width: 1.2rem;
    height: 1.2rem;
 }
  .suit-upload-img input{
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .suit-btn{
    width: 85%;
    margin: auto;
  } 
</style>
