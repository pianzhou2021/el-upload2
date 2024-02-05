<template>
  <div @click="handleClick" @paste="handlePaste">
    <Upload
      ref="upload"
      v-bind="$attrs"
      v-on="$listeners"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
    >
      <slot></slot>
    </Upload>
  </div>
</template>
<script>
import { Upload } from 'element-ui';

function noop() {}

export default {
  name: 'ElUpload2',
  data() {
    return {
      confirm: false,
    };
  },
  components: {
    Upload,
  },
  props: {
    onSuccess: {
      type: Function,
      default: noop
    },
    onRemove: {
      type: Function,
      default: noop
    },
  },
  mounted() {
    this.extend();
  },
  methods: {
    handleClick(event) {
      if (!this.confirm && this.$refs.upload.drag) {
        event.preventDefault();
      }
    },
    handleConfirmClick() {
      this.confirm = true;
      setTimeout(()=> {
        this.confirm = false;
      }, 1000);
    },
    handleSuccess(response, file, uploadFiles) {
      this.$refs.upload.fileList.push(file);
      this.onSuccess(response, file, uploadFiles);
    },
    handleRemove(file, uploadFiles) {
      this.$refs.upload.fileList.splice(this.$refs.upload.fileList.indexOf(file), 1);
      this.onRemove(file, uploadFiles);
    },
    extend() {
      const refMethod = Object.entries(this.$refs['upload'])
      for (const [key, value] of refMethod) {
        if (!(key.includes('$') || key.includes('_'))) {
          this[key] = value
        }
      }
    },
    async handlePaste(event) {
        let files = await this.loadClipBoardFiles(event);
        const upload  = this.$refs.upload;
        const accept = upload.accept;
        if (accept) {
          files = files.filter((file) => {
            const { type, name } = file;
            const extension = name.indexOf('.') > -1
              ? `.${ name.split('.').pop() }`
              : '';
            const baseType = type.replace(/\/.*$/, '');
            return accept.split(',')
              .map(type => type.trim())
              .filter(type => type)
              .some(acceptedType => {
                if (/\..+$/.test(acceptedType)) {
                  return extension === acceptedType;
                }
                if (/\/\*$/.test(acceptedType)) {
                  return baseType === acceptedType.replace(/\/\*$/, '');
                }
                if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
                  return type === acceptedType;
                }
                return false;
              });
          });
        }

        upload.$refs['upload-inner'].uploadFiles(files);
    },
    loadClipBoardFiles(event) {
      return new Promise((resolve, reject) => {
        let clipboardData = event.clipboardData; // IE
        if (!clipboardData) {
          //chrome
          clipboardData = event.originalEvent.clipboardData;
        }
        let items = (event.clipboardData || window.clipboardData).items;
        if (!items || items.length === 0) {
            return;
        }

        let files = [];
        for (let i = 0; i < items.length; i++) {
          let file = items[i].getAsFile();
          if (file) {
            files.push(file);
          }
        }

        if (files.length) {
          resolve(files);
        } else {
          reject('There are no files on the clipboard!')
        }
      })
    }
  }
};
</script>
