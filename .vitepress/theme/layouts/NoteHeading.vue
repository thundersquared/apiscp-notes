<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const { page } = useData()
</script>

<template>
    <Layout>
        <template #doc-before>
            <h1 class="page-title"><span v-show="page.frontmatter.emoji" class="page-emoji">{{ page.frontmatter.emoji
            }}</span> {{ page.title }}</h1>
        </template>
    </Layout>
</template>

<style scoped>
.page-title {
    font-size: 2rem;
    margin-bottom: 36px;
}

.page-emoji {
    font-family: sans-serif, "Apple Color Emoji", "Android Emoji", "Segoe UI";
}
</style>