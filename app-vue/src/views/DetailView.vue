<template>
    <section class="content-root">
        <section class="job-detail-root">
            <div class="job-detail-container">

                <div v-if="this.detailData"
                     class="job-detail-block"
                >

                    <div class="job-top-detail-item">
                        <div class="image-block">
                            <img v-bind:src="this.detailData.imageUrl"
                                 v-bind:alt="this.detailData.companyName"
                            />
                        </div>

                        <div class="main-info-block">
                            <p>{{this.detailData.positionName}}</p>
                            <p>{{this.detailData.companyName}}</p>
                            <p>{{this.detailData.cityName}} / {{this.detailData.townName}}</p>
                        </div>


                    </div>

                    <div class="job-bottom-detail-item">
                        <div class="desc-block">
                            <p>Detay : {{this.detailData.description}}</p>
                        </div>

                        <div class="adress-block">
                            <p>Adres : {{this.detailData.address}}</p>
                        </div>

                        <div v-if="this.detailData.contactPhone" class="phone-block">
                            <p>Telefon : {{this.detailData.contactPhone.countryCallingCode}}
                                {{this.detailData.contactPhone.areaCode}} {{this.detailData.contactPhone.number}}</p>
                        </div>
                    </div>

                    <aside class="duration-block">
                        <span>{{this.detailData.durationDayText}}</span>
                        <span> / </span>
                        <span>{{this.detailData.durationDay}} gün</span>
                    </aside>

                    <aside class="distance-block">
                        <p>{{this.detailData.cityName}} / {{this.detailData.townName}}</p>
                    </aside>

                </div>

            </div>

            <div class="input-wrapper">
                <div class="button-item">
                    <button type="button">
                        <router-link v-bind:to="$options.routes.JOB_LIST">
                            Liste sayfasına geri dön
                        </router-link>
                    </button>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import * as ROUTES from '../const/ROUTES';

    export default {
        computed: {
            ...mapState({
                detailData: (state) => {
                    return (state.detailModule.all && state.detailModule.all.data) ? state.detailModule.all.data : {}
                }
            })
        },

        routes: ROUTES,

        beforeCreate() {

        },

        created() {
            let jobId = this.$router.currentRoute.params.id;
            this.getDetail(jobId);
        },

        beforeMount(){

        },

        mounted() {

        },

        activated() {

        },

        beforeDestroy() {

        },

        destroyed() {
            this.resetDetail();
        },

        methods: {
            ...mapActions('detailModule', {
                getDetail: 'getDetail',
                resetDetail: 'resetDetail'
            })
        }
    }
</script>