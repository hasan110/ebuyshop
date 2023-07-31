import Vue from 'vue';

import SiteHeader from '@/components/template/site-header';
import SiteBottomNavigation from '@/components/template/site-bottom-navigation';
import SsrCarousel from 'vue-ssr-carousel'

const partialComponents = {
  SsrCarousel,
  SiteHeader,
  SiteBottomNavigation
}

Object.entries(partialComponents).forEach(([name, component]) => {
    Vue.component(name, component)
})
