<template>
    <div>
        <div>
            <div class="row">
                <div class="col-3"/>
                <div class="col-6">
                    <div class="card">
                        <div class="card-header">
                            <h1 class="align-middle">Map</h1>
                        </div>
                        <div class="card-body">
                            <GmapMap
                                    :center="myCoordiantes"
                                    :zoom="zoom"
                                    style="width:640px; height: 360px; margin: 32px auto"
                                    ref="mapRef"
                                    @dragend="handleDrag">

                            </GmapMap>
                        </div>
                    </div>
                </div>
                <div class="col-3"/>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Map",
        data() {
            return {
                map: null,
                myCoordiantes: {
                    lat: 0,
                    lng: 0
                },
                zoom: 7
            }
        },
        created() {
            if(localStorage.center) {
                this.myCoordiantes = JSON.parse(localStorage.center);
            }else {
                this.$getLocation({})
                    .then(coordinates => {
                    this.myCoordiantes = coordinates;
                })
                    .catch(error => alert(error));
            }
            if(localStorage.zoom) {
                this.zoom = parseInt(localStorage.zoom)
            }
        },
        mounted() {
            this.$refs.mapRef.$mapPromise.then(map => this.map = map);
        },
        methods: {
            handleDrag() {
                let center = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                };
                let zoom = this.map.getZoom()

                localStorage.center = JSON.stringify(center);
                localStorage.zoom = zoom;
            }
        },
        computed: {
            mapCoordinates() {
                if(this.map) {
                    return {
                        lat: 0,
                        lng: 0
                    };
                }
                return {
                    lat: this.map.getCenter().lat().toFixed(4),
                    lng: this.map.getCenter().lng().toFixed(4)
                }
            }
        }
    }
</script>

<style scoped>

</style>