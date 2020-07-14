<template>
    <aside class="menu"></aside>
</template>

<script>
export default {
    name:'Menu'
}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to left, rgb(126, 124, 124),rgb(134, 130, 130));

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
</style>