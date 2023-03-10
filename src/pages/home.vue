<template>
<div class="d-flex text-center">
    <div class="main mx-auto"  :style="`width:850px;height:745px`">
        <Header></Header>
        <Menu></Menu>
        <Footer></Footer>
    </div>
</div>
</template>

<script>
import Menu  from '../components/Menu.vue';
import Header  from '../components/Header.vue';
import Footer  from '../components/Footer.vue';
export default {
    components: {
        Menu,
        Header,
        Footer
    }
}
</script>

<style>

</style>