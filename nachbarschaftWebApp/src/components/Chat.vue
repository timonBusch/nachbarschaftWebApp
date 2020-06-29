<template>
    <div>
        <div class="container-fluid mt-2 w-50">
            <div class="card myNewDivHeight">
                <div class="card-header">
                    <h1 class="card-title">Chat - Hans Jürgen</h1>
                </div>
                <div class="card-body">
                    <!-- Nachrichten -->

                </div>
                <div class="card-footer">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Nachricht...">
                        <div class="input-group-append">
                            <button class="btn btn-info" type="submit">Senden</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Chat',
    }
</script>

<style scoped>
    @media screen and (min-width: 1024px) {
        .myNewDivHeight{
            height:600px;
        }
    }

</style>