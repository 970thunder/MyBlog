<!-- .vitepress/theme/MyLayout.vue -->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
// 组件
import bsz from "./bsz.vue";
import tags from "./tags.vue";
</script>

<template>
    <DefaultTheme.Layout v-bind="$attrs">

        <!-- layout-bottom插槽 -->
        <template #layout-bottom>
            <bsz />
        </template>

        <!-- doc-before插槽 -->
        <template #doc-before>
            <tags />
        </template>

    </DefaultTheme.Layout>
</template>

<style scoped></style>