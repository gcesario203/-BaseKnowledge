<template>
    <div class="header"></div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>
    .header{
        grid-area:header;
        background: linear-gradient(to left, rgb(10, 200, 99),rgb(26, 190, 108));
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>