<template lang="pug">
article.post
  .css-u5p2ag
    header.css-79elbk
      div
        h2.css-1izrdyl.no-link(v-if='noTitleLink') {{ article.title }}
        router-link(v-else :to='link')
          h2.css-1izrdyl {{ article.title }}
        .css-1d7x0cs(v-if='article.author')
          time.updated(:datetime='article.updatedAt')
          p {{ article.author.name }} · {{ formatDate(article.updatedAt) }} 업데이트
    .css-12m1dn8(:style='{background: article.backgroundColorForPreview}')
      v-img.article-img(
        lazy-src='/images/placeholder.png'
        :src='article.img'
      )
        template(v-slot:placeholder)
          v-row.fill-height.ma-0(align='center' justify='center')
            v-progress-circular(indeterminate color='grey lighten-5')
      nuxt-content.article-excerpt(:document='article.excerpt' :style='{background: "#fff"}')
    footer.go-link(v-if='useLink')
      router-link(:to='link') {{ `${buttonText} >` }}
    footer.css-3872h1(v-else)
      router-link.css-13xd08w(:to='link') {{ buttonText }}
</template>

<script>
export default {
  name: 'ArticlePreview',
  props: {
    type: {
      type: String,
      required: false,
      default: () => null
    },
    article: {
      type: Object,
      required: true
    },
    noTitleLink: {
      type: Boolean,
      required: false,
      default: () => false
    },
    buttonText: {
      type: String,
      required: false,
      default: () => '이어서 읽기'
    },
    useLink: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('ko', options)
    }
  },
  computed: {
    link () {
      if (!this.article) return ''
      return `${this.type ? '/' + this.type : ''}/${this.article.slug}`
    },
    excerpt () {
      if (!this.article) return ''
      return ''
    }
  }
}
</script>


<style lang="scss" scoped>
a {
  text-decoration: none;
  transition: all 0.2s ease-in-out 0s;
}

.article-img {
  width: 100%;
  max-width: 450px;
  margin: auto;
}

.article-excerpt {
  padding-top: 2rem;
}

.css-u5p2ag {
  position: relative;
  padding: 25px 0 35px;
}

.css-79elbk {
  position: relative;
}

.css-1izrdyl {
  font-size: 28px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  cursor: pointer;
  margin-bottom: 25px;
  color: #000;
  -webkit-transition: color 0.5s;
  transition: color 0.5s;
}

.no-link.css-1izrdyl {
  font-size: 26px;
  cursor: default;
}

.css-1izrdyl:hover,.css-1izrdyl:focus {
  color: #0077ff;
}
.no-link.css-1izrdyl:hover,.no-link.css-1izrdyl:focus {
  color: #000;
}

.css-1a2v9hb {
  max-width: 100%;
  height: auto;
}

.css-1d7x0cs {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  margin-bottom: 30px;
}

.css-1d7x0cs p {
  margin-bottom: 0;
  line-height: 1.2;
  font-size: 14px;
}

.css-qyxjlf {
  margin-bottom: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}

.css-12m1dn8 {
  font-family: "Georgia",serif;
}

.css-12m1dn8 p {
  margin-bottom: 1.2rem;
}

.css-12m1dn8 figure {
  margin-bottom: 1.3rem;
}

.css-12m1dn8 img {
  width: 100%;
}

.css-12m1dn8 *:last-child {
  margin-bottom: 0 !important;
}

.css-12m1dn8 p > img {
  width: initial;
}

.css-12m1dn8 .backlinko-image img {
  display: inline-block;
  width: 100%;
}

.css-12m1dn8 .backlinko-image.backlinko-has-border img {
  border: 4px solid #cccccc;
}

.css-12m1dn8 .backlinko-image.img-circle img {
  border-radius: 50% !important;
}

.css-12m1dn8 .alignnone {
  margin-left: 0;
  margin-right: 0;
  max-width: 100%;
  height: auto;
}

.css-12m1dn8 .aligncenter {
  display: block;
  margin: 1rem auto;
  height: auto;
}

.css-12m1dn8 .alignleft {
  margin-bottom: 1rem;
  height: auto;
}

.css-12m1dn8 .alignright {
  margin-bottom: 1rem;
  height: auto;
}

.css-12m1dn8 .backlinko-image__centered-image img {
  margin: 0 auto !important;
}

.css-12m1dn8 .backlinko-image__img-explicit-no-border:not(.backlinko-has-border) img {
  border: 0 none !important;
  border-radius: 0 !important;
}

.css-12m1dn8 .backlinko-image__img-mt-minus-1-xs-up img {
  margin-top: -1rem !important;
}

.css-12m1dn8 .backlinko-image__img-mt-minus-1-point-5-xs-up img {
  margin-top: -1.5rem !important;
}

.css-12m1dn8 .backlinko-image__img-mt-minus-2-xs-up img {
  margin-top: -2rem !important;
}

.css-12m1dn8 .backlinko-image__img-mt-minus-2-point-5-xs-up img {
  margin-top: -2.5rem !important;
}

.css-12m1dn8 .backlinko-image__img-mt-minus-2-point-75-xs-up img {
  margin-top: -2.75rem !important;
}

.css-12m1dn8 .backlinko-image__img-mt-minus-3-xs-up img {
  margin-top: -3rem !important;
}

.css-12m1dn8 .backlinko-image__img-mt-minus-4-point-5-xs-up img {
  margin-top: -4.5rem !important;
}

.css-12m1dn8 .backlinko-image__img-mb-0 img {
  margin-bottom: 0 !important;
}

.css-12m1dn8 .backlinko-image__img-border-radius-4 img,.css-12m1dn8 .visual > img {
  border: 0 none !important;
  border-radius: 0.25rem !important;
}

.css-12m1dn8 .backlinko-image__img-hub-rounded img,.css-12m1dn8 .backlinko-image__rounded img {
  border: 0 none !important;
  border-radius: 0.5rem !important;
}

.css-12m1dn8 .backlinko-image__screenshot img {
  outline: none !important;
  margin: 0 auto !important;
  border: 4px solid #cccccc;
  border-radius: 0 !important;
}

.css-12m1dn8 .backlinko-image__visual-chart img {
  outline: none !important;
  margin: 0 auto !important;
  border: 0 none !important;
  border-radius: 0.3rem !important;
}

.css-12m1dn8 .backlinko-image__bg-white img {
  background-color: #fff !important;
}

.css-12m1dn8 .backlinko-image__bg-light-gray-lighter img {
  background-color: #f8f8f8 !important;
}

.css-12m1dn8 .backlinko-image__bg-light-gray-darker img {
  background-color: #f4f4f4 !important;
}

.css-3872h1 {
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 1.5rem;
}

.css-toegfy {
  font-size: 14px;
  display: flex;
  line-height: 1;
  -webkit-box-align: center;
  align-items: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  margin-bottom: 0px !important;
}

.css-toegfy span {
  color: #00afff;
  font-size: 36px;
  font-weight: 700;
  padding-right: 10px;
}

.css-13xd08w {
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-style: normal;
  white-space: normal;
  -webkit-letter-spacing: 0;
  -moz-letter-spacing: 0;
  -ms-letter-spacing: 0;
  letter-spacing: 0;
  cursor: pointer;
  text-transform: none;
  font-weight: 600;
  min-height: 3.7875rem;
  color: #fff;
  background-color: #00afff;
  border-color: #00afff;
  width: 100%;
  border-radius: 6px;
}

.css-13xd08w:link,.css-13xd08w:visited,.css-13xd08w:hover,.css-13xd08w:active {
  color: #fff;
  -webkit-text-decoration: none;
  text-decoration: none;
}

.css-13xd08w:hover {
  background: #0077ff;
  border-color: #0077ff;
}

.go-link {
  margin-top: 10px;
  text-align: right;
  a {
    text-decoration: underline;
    font-size: 18px;
    font-weight: 800;
  }
}

@media (min-width: 540px) {
  .css-12m1dn8 .alignright {
    float:right;
    margin-left: 1rem;
  }
  .css-12m1dn8 .alignleft {
    float:left;
    margin-left: 1rem;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-1-point-5-sm-up img {
    margin-top:-1.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-1-sm-up img {
    margin-top:-1rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-2-sm-up img {
    margin-top:-2rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-2-point-5-sm-up img {
    margin-top:-2.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-2-point-75-sm-up img {
    margin-top:-2.75rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-3-sm-up img {
    margin-top:-3rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-4-point-5-sm-up img {
    margin-top:-4.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-1-sm-up img {
    margin-bottom:-1rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-2-sm-up img {
    margin-bottom:-2rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-2-point-5-sm-up img {
    margin-bottom:-2.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-3-sm-up img {
    margin-bottom:-3rem !important;
  }
}

@media (min-width: 768px) {
  .css-u5p2ag {
    padding:35px 0 55px;
  }
  .css-1izrdyl {
    font-size:38px;
  }
  .css-toegfy {
    margin-right: 30px;
  }
  .css-12m1dn8 .backlinko-image.alignleft-md-up {
    float:left;
    margin-left: 1rem;
  }
  .css-12m1dn8 .backlinko-image.alignright-md-up {
    float:right;
    margin-left: 1rem;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-1-md-up img {
    margin-top:-1rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-1-point-5-md-up img {
    margin-top:-1.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-2-md-up img {
    margin-top:-2rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-2-point-5-md-up img {
    margin-top:-2.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-2-point-75-md-up img {
    margin-top:-2.75rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-3-md-up img {
    margin-top:-3rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-4-point-5-md-up img {
    margin-top:-4.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-1-md-up img {
    margin-bottom:-1rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-2-md-up img {
    margin-bottom:-2rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-2-point-5-md-up img {
    margin-bottom:-2.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-3-md-up img {
    margin-bottom:-3rem !important;
  }
  .css-3872h1 {
    display:-webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-top: 2rem;
  }
}

@media (min-width: 992px) {
  .css-u5p2ag {
    padding:50px 0;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-1-lg-up img {
    margin-top:-1rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-1-point-5-lg-up img {
    margin-top:-1.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-2-lg-up img {
    margin-top:-2rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-2-point-5-lg-up img {
    margin-top:-2.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-2-point-75-lg-up img {
    margin-top:-2.75rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-3-lg-up img {
    margin-top:-3rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mt-minus-4-point-5-lg-up img {
    margin-top:-4.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-1-lg-up img {
    margin-bottom:-1rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-2-lg-up img {
    margin-bottom:-2rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-2-point-5-lg-up img {
    margin-bottom:-2.5rem !important;
  }
  .css-12m1dn8 .backlinko-image__img-mb-minus-3-lg-up img {
    margin-bottom:-3rem !important;
  }
}

</style>

<style lang="scss">
.css-15j7bd7 .post + .post > div {
  border-top: 1px solid #e6e6e6;
}

.css-15j7bd7 article:last-of-type > div:last-of-type {
  border-bottom: 1px solid #e6e6e6;
}

@media (min-width: 576px) {
  .css-15j7bd7 {
    padding-right:10px;
    padding-left: 10px;
  }
}

@media (min-width: 540px) {
  .css-15j7bd7 {
    max-width:540px;
  }
}

@media (min-width: 768px) {
  .css-15j7bd7 {
    padding-bottom:50px;
    max-width:720px;
  }
}

@media (min-width: 992px) {
  .css-15j7bd7 {
    padding-top:20px;
    padding-bottom: 90px;
    max-width: 850px;
    article {
      padding:0 60px;
      margin-top: 20px;
    }
    article:first-child {
      margin-top:0;
    }
  }
}
</style>

