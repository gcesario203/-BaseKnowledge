<template>
    <footer class="footer">
        <span>Feito com amor por Gabriel Cesario</span>
    </footer>
</template>

<script>
export default {
    name:'Footer'
}
</script>

<style>
    .footer{
        grid-area: footer;
        background-color: rgba(219, 219, 221, 0.856);
        color:black;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 10px 0 0;
    }
</style>