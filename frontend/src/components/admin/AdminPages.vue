<template>
    <div class="admin-page">
        <PageTitle icon="fa fa-cogs" main="Administração do sistema" sub="Cadastros and cia"></PageTitle>
        <div class="admin-pages-tabs">
            <b-card>
                <b-tabs>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin></ArticleAdmin>
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin></CategoryAdmin>
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin></UserAdmin>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import UserAdmin from './UserAdmin'
import CategoryAdmin from './CategoryAdmin'

export default {
    name:'AdminPages',
    components:{PageTitle, ArticleAdmin,CategoryAdmin,UserAdmin}
}
</script>

<style>

</style>