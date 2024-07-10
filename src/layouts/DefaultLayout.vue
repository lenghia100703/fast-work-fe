<script setup lang='ts'>
import Header from '@/components/commons/Header.vue'
import NavigationDesktop from '@/layouts/NavigationDesktop.vue'
</script>

<template>
    <div class='common-layout'>
        <el-container>
            <el-aside width='auto'>
                <NavigationDesktop />
            </el-aside>
            <el-container>
                <el-header id='header'>
                    <Header />
                </el-header>
                <el-main id='main'>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>

</style>