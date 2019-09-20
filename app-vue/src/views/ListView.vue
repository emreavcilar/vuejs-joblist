<template>
    <section class="content-root">

        <section class="job-list-root">

            <div class="input-container">
                <div class="input-wrapper">
                    <div class="input-item">
                        <label>İlanları Filtrele</label>

                        <select v-model="selectedCityModel" @change="this.getJobBySelectedCity">
                            <option value="">BÜTÜN İLLER</option>

                            <option v-for="(cityCode,index) in Object.keys($options.cities_data.CITIES)"
                                    :key="index"
                                    :value="cityCode"
                            >
                                {{$options.cities_data.CITIES[cityCode]}}
                            </option>

                        </select>

                    </div>

                    <div class="input-item">

                        <input type="text" placeholder="Anahtar Kelime" v-model="textInputModel"/>
                    </div>

                    <div class="button-item">
                        <button title="İstersen entera da basabilirsin"
                                type="button"
                                @click="getJobByName"
                        >
                            ARAMA
                        </button>
                    </div>
                </div>
            </div>

            <div class="job-list-container">
                <div v-if="this.manipulatedData && this.manipulatedData.length>0">
                    <div class="title-block">
                        <h1>İLGİLENEBİLECEĞİNİZ İLANLAR</h1>
                    </div>

                    <div class="job-list-wrapper">

                        <router-link v-bind:to="$options.routes.JOB_DETAIL_WITHOUT_PARAM+listItem.jobId"
                                     class="job-list-item"
                                     v-for="(listItem,index) in this.manipulatedData"
                                     :key="index"
                        >
                            <div class="image-block">
                                <img v-bind:src="listItem.imageUrl"
                                     v-bind:alt="listItem.companyName"
                                />
                            </div>

                            <div class="info-block">
                                <p>{{listItem.positionName}}</p>
                                <p><span>{{listItem.companyName}}</span></p>
                                <p>{{listItem.cityName}} / {{listItem.townName}}</p>
                            </div>

                            <aside class="duration-block">
                                <span>{{listItem.durationDayText}}</span>
                                <span> / </span>
                                <span>{{listItem.durationDay}} gün</span>
                            </aside>

                            <aside class="distance-block">
                                <p>{{listItem.distance}}</p>
                            </aside>
                        </router-link>

                    </div>

                </div>

                <div class="no-result-block" v-if="this.manipulatedData && this.manipulatedData.length === 0">
                    <p>Aradığınız kriterde sonuç bulunamadı.</p>
                </div>

            </div>

        </section>
    </section>

</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import * as CITIES_DATA from '../const/cities';
    import * as ROUTES from '../const/ROUTES';

    export default {
        cities_data: CITIES_DATA,
        routes: ROUTES,

        data:function () {
            return {
                selectedCityModel: "",
                textInputModel:null,
            };
        },
        computed: {
            ...mapState({
                listData: (state) => {
                    return (state.listModule.all && state.listModule.all.data) ? state.listModule.all.data : []
                },
                manipulatedData: (state) => {
                    return (state.listModule.man && state.listModule.man.manData) ? state.listModule.man.manData : []
                }
            }),
        },

        beforeCreate() {

        },

        created() {
            this.getJobList();
        },

        beforeMount() {

        },

        mounted() {
            document.addEventListener('keydown', this.onWindowKeyDown);
        },

        activated() {

        },

        beforeDestroy() {

        },

        destroyed() {
            document.removeEventListener('keydown', this.onWindowKeyDown);
        },

        methods: {
            ...mapActions('listModule', {
                getJobList: 'getList',
                setManipulatedData: 'setManipulatedData',
            }),

            onWindowKeyDown: function (e) {
                if (event.which === 13) {
                    this.getJobByName();
                }
            },

            getJobByName: function () {
                // console.log(this.selectedCityModel.length);

                //todo : BUG çözüldü
                //todo > eğer kullanıcı bir şehir seçmiş ise var olan
                //todo > şehirde text içindeki obje araması yapılır aksi durumda bütün
                //todo > şehirlerde arama yapılır
                let data = this.selectedCityModel > 0 ? this.manipulatedData : this.listData;

                if (this.textInputModel && this.textInputModel.length > 0) {
                    let tempData = data.filter((x, i) => {
                        let data = x.positionName.toLocaleLowerCase();
                        let inputVal = this.textInputModel.toLocaleLowerCase();

                        console.log("data " , data);
                        console.log("inputVal " , inputVal);

                        let regData = new RegExp(inputVal);
                        if (regData.test(data)) {
                            console.log("x ", x);
                            return x;
                        }
                    });
                    this.setManipulatedData(tempData);
                }
                else{
                    this.setManipulatedData([]);
                    //todo : textbox boş ve seçili herhangi bir il var ise seçili ildeki bütün ilanların getirilmesi için
                    this.getJobBySelectedCity();
                }
            },

            getJobBySelectedCity: function () {
                this.setManipulatedData([]);

                if (this.selectedCityModel.trim() == "") {
                    // this.manipulatedDataArr = this.listData;
                    this.setManipulatedData(this.listData)
                }
                else {
                    let tempArr = [];
                    this.listData.filter(val => {
                        let name = CITIES_DATA.CITIES[this.selectedCityModel];
                        if (val.cityName == name) {
                            tempArr.push(val);
                        }
                    });
                    this.setManipulatedData(tempArr);
                }
                if(this.textInputModel && this.textInputModel.trim().length>0){
                    this.getJobByName();
                }
            }
        }
    };

</script>