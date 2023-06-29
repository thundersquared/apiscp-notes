<script setup>
import { useData } from 'vitepress'
const { page } = useData()
</script>

<template>
    <h1 class="page-title">
        <span v-show="page.frontmatter.emoji" class="page-emoji">
            {{ page.frontmatter.emoji }}
        </span>
        {{ page.title }}
    </h1>
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