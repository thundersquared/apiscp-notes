// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Theme from 'vitepress/theme';
// import Logo from './layouts/Logo.vue';
import NoteHeading from './layouts/NoteHeading.vue';
import './style.css';

export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 'nav-bar-title-before': () => h(Logo),
      'doc-before': () => h(NoteHeading),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
};