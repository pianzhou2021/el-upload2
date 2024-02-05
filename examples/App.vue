<template>
  <div id="app">
    <el-upload2
      ref="upload2"
      drag
      action="http://youruploadserver.dev/upload"
      :file-list="fileList"
      :auto-upload="false"
      list-type="picture"
      accept=".png,.jpg"
      multiple
    >
        <i class="el-icon-upload" @click="$refs.upload2.handleConfirmClick()"></i>
        <div class="el-upload__text">Drag files here, or <em @click="$refs.upload2.handleConfirmClick()">Click to upload</em></div>
        <div class="el-upload__tip" slot="tip">Only jpg/png files can be uploaded</div>
    </el-upload2>
    <hr/>
    <button @click="handleClick">Display filelist to console</button>
    &nbsp;
    <button @click="handleClean">Clean filelist</button>
    &nbsp;
    <button @click="submitUpload">Submit upload</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ]
    }
  },
  methods: {
    handleClick() {
      console.log('filelist>>>>', this.fileList);
      console.log('uploadfilelist1>>>>', this.$refs.upload2.uploadFiles);
    },
    handleClean() {
      this.fileList = [];
    },
    submitUpload() {
        this.$refs.upload2.submit();
      },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
