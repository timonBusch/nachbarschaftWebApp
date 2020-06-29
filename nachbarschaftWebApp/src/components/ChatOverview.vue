<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-header">
                    <h1 class="card-title">Nachrichten</h1>
                </div>
                <div class="card-body">
                    <div class="list-group list-group-flush">
                        <router-link :to="{ name: 'chat'}" >
                            <div class="list-group-item list-group-item-action bg-light">
                                <span class="h5 text-decoration-none">Hans Jürgen</span>
                                <span class="h5 float-right">15.40</span>
                            </div>
                        </router-link>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChatOverview"
    }
</script>

<style scoped>

</style>