import Vue from 'vue';

const assetsComponents = {}
const Components = {}

Object.entries(assetsComponents).forEach(([name, component]) => {
    Vue.use(component)
})

Object.entries(Components).forEach(([name, component]) => {
    Vue.component(name, component)
})