<template lang="pug">
.css-za4qqw(:class='{"use-share": !buttonOnly}')
  .css-17ia555
    h1.css-1bk7ox4 {{ title }}
    .css-70qvj9
      .css-1c7u7ph
        p {{ desc }}
    .input-action-container(:class='{long: !buttonOnly}')
      diagnosis-input(
        :buttonOnly='buttonOnly'
        :buttonText='buttonText'
        :directUrl='directUrl'
        :loading='inputOption && inputOption.isProcessing'
        @onSubmit='onSubmit'
      )
</template>

<script>
import DiagnosisInput from './DiagnosisInput'

export default {
  name: "TopBanner",
  components: { DiagnosisInput },
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    buttonOnly: {
      type: Boolean,
      required: true
    },
    inputOption: {
      type: Object,
      required: false
    },
    focusInput: {
      type: Boolean,
      required: false,
      default: () => false
    },
    tooltipText: {
      type: String,
      required: false
    },
    buttonText: {
      type: String,
      required: true
    },
    directUrl: {
      type: String,
      required: false,
      default: () => ''
    }
  },
  data: () => ({ url: '' }),
  methods: {
    onSubmit (res) {
      this.$emit("onButtonClick", res)
    }
  },
  watch: {
    focusInput: function (n, o) {
      if (n !== o) {
        this.$refs.diagnosisInput.focus()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.css-za4qqw {
  background-image: linear-gradient(180deg, #fff 10%, #eef0f7);
  padding: 60px 0 70px;
}
.css-za4qqw.use-share {
  padding: 90px 0 135px;
}

.css-17ia555 {
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
  margin-right: auto;
  margin-left: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
}

.css-1bk7ox4 {
  margin-bottom: 40px;
  font-size: 32px;
}

h1.css-1bk7ox4 {
  margin-top: 16px;
}

.css-70qvj9 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}


.css-1c7u7ph {
  text-align: center;
  line-height: 1.6;
  max-width: 400px;
}

.css-1c7u7ph strong {
  font-weight: 600;
}

.css-1c7u7ph *:last-child {
  margin-bottom: 0 !important;
}

.input-action-container {
  width: 100%;
  margin: 35px 0 0;
  max-width: 460px;
}

.input-action-container.long {
  max-width: 600px;
}

@media (min-width: 576px) {
  .css-17ia555 {
    padding-right: 10px;
    padding-left: 10px;
  }
}

@media (min-width: 540px) {
  .css-17ia555 {
    max-width: 540px;
  }
}

@media (max-width: 767.98px) {
  .css-za4qqw {
    border-bottom: 1 solid #ccd3e8;
  }
}

@media (min-width: 768px) {
  .css-17ia555 {
    max-width: 720px;
  }
  .css-za4qqw {
    padding: 90px 0 135px;
  }
  .css-1bk7ox4 {
    font-size: 43px;
  }
  .input-action-container {
    margin: 45px 0 0;
  }
}

@media (min-width: 992px) {
  .css-17ia555 {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .css-17ia555 {
    max-width: 1140px;
  }
}
</style>
