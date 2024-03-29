<template lang="pug">
.jett-container
  navigation-bar
  .wrap
    section
      top-banner(
        title='검색엔진 최적화 전략에 대해 알아보세요!'
        desc='다양한 SEO 전략과 마케팅에 대한 최신 정보를 확인하고, 내 사이트를 한층 더 업그레이드하세요.'
        :buttonOnly='true'
        buttonText='SEO 전략 서비스 알아보기'
        @onButtonClick='showService'
      )
    v-main
      .css-15j7bd7(v-if='articles')
        template(v-for='article in articles')
          article-preview(
            type='blog'
            :article='article'
          )
        nav.css-1i46dgl(v-show='isMore')
          h2.css-18dt6si Posts navigation
          .css-1ctem6t
            .css-1lkog1
              nuxt-link.css-419jou(to='/blog/page/2') 다음
  page-footer
</template>

<script>
import TopBanner from '@/components/TopBanner'
import ArticlePreview from '@/components/blog/ArticlePreview'
const NUXT_APP_BASE_URL = process.env.NUXT_APP_BASE_URL || 'https://jettanalysis.com'
const NUXT_APP_FRONTEND_PORT = process.env.NUXT_APP_FRONTEND_PORT || ''
const FRONTEND_BASE_URL = `${NUXT_APP_BASE_URL}${NUXT_APP_FRONTEND_PORT}`
const PER_PAGE = 5

export default {
  name: 'Blog',
  components: { TopBanner, ArticlePreview },
  async asyncData({ $content, params }) {
    const total = await $content('articles', 'blog').only(['slug']).fetch()
    const articles = await $content('articles', 'blog')
      .only(['title', 'body', 'excerpt', 'img', 'slug', 'author', 'updatedAt', 'tags', 'backgroundColorForPreview'])
      .sortBy('createdAt', 'desc')
      .limit(PER_PAGE)
      .fetch()

    articles.map((article) => { article.excerpt = { body: article.excerpt } })

    const isMore = total.length > articles.length

    return { articles, isMore }
  },
  head ({$seoMeta}) {
    const title = '검색엔진 최적화 블로그'
    return {
      title: title,
      meta: $seoMeta(
        { 
          title: `${title} | ${process.env.NUXT_APP_SITE_NAME || 'JETT Analysis'}`,
          url: `${FRONTEND_BASE_URL}${this.$route.path}`,
          description: 'JETT Analysis의 다양한 노하우를 소개하는 검색엔진 최적화 블로그입니다.'
        },
        false
      ).concat([ { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: `${title} | JETT Analysis` } ]),
      link: [ {rel: 'canonical', href: `${FRONTEND_BASE_URL}${this.$route.path}`} ]
    }
  },
  methods: {
    showService () {
      this.$router.push('/service')
    }
  }
}
</script>


<style lang="scss" scoped>
.wrap {
  font-size: 1.125rem;
  background-color: rgb(255, 255, 255);
  overflow-x: hidden;
}
.css-15j7bd7 {
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
  margin-right: auto;
  margin-left: auto;
  padding-top: 30px;
  padding-bottom: 35px;
}

.css-1i46dgl {
  max-width: 710px;
  margin: 35px auto 0;
}
.css-18dt6si {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  -webkit-clip: rect(0,0,0,0);
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

.css-1ctem6t {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  margin: 0 -10px;
}

.css-1lkog1 {
  padding: 0 10px;
  width: 100%;
}

.css-419jou {
  width: 100%;
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
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 1.05rem 1.2rem;
  font-size: 1.125rem;
  line-height: 1.4;
  border-radius: 6px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: none;
}

@media (min-width: 768px) {
  .css-1i46dgl {
    margin:50px auto 0;
  }
}

@media (min-width: 992px) {
  .css-1i46dgl {
    margin:75px auto 0;
  }
}
</style>
