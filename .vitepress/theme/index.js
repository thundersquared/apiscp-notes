import DefaultTheme from 'vitepress/theme'
import NoteHeading from './layouts/NoteHeading.vue'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: NoteHeading
}
