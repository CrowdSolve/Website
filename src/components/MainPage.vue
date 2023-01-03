<template>
    <div id="backGround" class="py-2 m-auto text-white" v-if="daData != null">
        <h1 id="header" class="font-bold text-left my-9">Today's top questions</h1>
        <!-- QUESTION PREVIEW -->
        <div v-for="(question, index) in daData" :key="question" class="m-3 bg-slate-800 rounded-2xl">
            <!-- Question clickable image -->
            <div @click="$router.push('/questions/'+question['number'])" v-if="daImages[index] != null"
                style="width: 100%; height: 45vw; max-height: 20rem; background-size: cover">
                <img class="h-full min-w-full object-cover rounded-t-2xl" :src="daImages[index]" />
            </div>
            <!-- Question content -->
            <div class="p-3">
                <div @click="$router.push('/questions/'+question['number'])">
                    <!-- Question title -->
                    <div id="title" style="text-overflow: ellipsis; white-space: nowrap;
                        overflow: hidden;
                        text-align: left;" class="font-bold text-3xl mt-2">
                        {{ daData[index]['title'] }}
                    </div>
                    <br>
                    <!-- Question content -->
                    <div class="bg-gray-100 bg-opacity-0" id="content" v-html="daMarkdown[index]"></div>
                    <div class="text-left">...</div>
                </div>
                <!-- Question footer banner -->
                <table id="questionHead" class="flex text-white text-left mt-5">
                    <tr class="flex w-full">
                        <td @click="ComingSoon('Users')" class="cursor-pointer float-left m-auto mx-0">
                            <img class="rounded-full h-5 w-5 ml-1 mr-1"
                                v-bind:src="daData[index]['user']['avatar_url']" />
                        </td>
                        <td @click="ComingSoon('Users')" class="float-left m-auto mx-0">
                            <div id="user-name" class="text-sm">{{ daData[index]['user']['login']
                            }}&nbsp;&nbsp;●&nbsp;&nbsp;<span class="text-xs text-slate-500">{{
                                new Date(daData[index]['created_at']).toDateString()
                                }}</span>
                            </div>
                        </td>
                        <td @click="ComingSoon('Reactions')" class="cursor-pointer ml-auto float-right">
                            <i class="reaction material-symbols-outlined">
                                favorite
                            </i>
                        </td>
                        <td @click="ComingSoon('Reactions')" class="float-right">
                            <span class="reaction">{{ this.daData[index]['reactions']['heart'] }}</span>
                        </td>
                        <td @click="ComingSoon('Reactions')" class="cursor-pointer float-right"
                            style="margin-left: 1vw;">
                            <i class="reaction material-symbols-outlined">
                                chat
                            </i>
                        </td>
                        <td @click="ComingSoon('Reactions')" class="float-right">
                            <span class="reaction">{{ this.daData[index]['comments'] }}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- Android check -->
        <div v-if="isAndroid"
            @click='window.open("https://csolve.page.link/?link=https://crowdsolve.lasheen.dev/apn=dev.lasheen.crowdsolve" )'
            id="ad"><i class="noselect material-symbols-outlined">
                shop
            </i></div>
    </div>
</template>

<script>
export default {
    name: "MainPage",
    props: ['isAndroid', 'md'],
    data() {
        return {
            daData: null,
            daMarkdown: [],
            daImages: [],
            daDate: null
        }
    },
    async created() {
        // Fetch all questions data 
        const theData = await fetch("https://api.github.com/repos/CrowdSolve/data/issues")
        this.daData = await theData.json()

        // Split fetched questions data and render it (convert it to html)
        for (const item of this.daData) {
            const regexp = /(\!\[\]\(.*\))/g
            var matches_array = item['body'].match(regexp)
            var rest = ''
            if (matches_array) {
                rest = item['body'].replace(matches_array, "")
                this.daImages[this.daData.indexOf(item)] = matches_array.toString().replace("![](", "").replace(")", "")
            } else {
                rest = item['body']
                this.daImages[this.daData.indexOf(item)] = null
            }
            const daVar = this.md.render(rest)
            this.daMarkdown.push(daVar)

            this.daDate = new Date(this.daData['created_at']).toDateString()
        }
    },
    methods: {
        // Show coming soon message
        ComingSoon(message) {
            this.$toast.show(message + " coming soon, Check CrowdSolve on Play Store to access them", {
                type: 'default',
                position: 'bottom-right',
                duration: 1000
            })
        },
        // Redirect to the play store
        toPlayStore() {
            window.open("https://csolve.page.link/?link=https://crowdsolve.lasheen.dev/questions/" + pageNo + "&apn=dev.lasheen.crowdsolve")
        }
    }
}
</script>

<style scoped>
#backGround {
    max-width: 50rem;
    /* background-color: #181D31; */
    /* margin: 0rem min(100px, auto) 0rem min(100px, auto); */
}

#header {
    font-size: 3rem;
    margin: 2rem 0rem 2rem 0.5rem;
}

.reaction {
    color: grey;
    font-size: 1.4rem;
    line-height: 1.1rem;
}

#content {
    text-overflow: clip;
    white-space: nowrap;
    overflow: hidden;
    max-height: 5rem;
    text-align: left;
    background: -webkit-linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

#ad {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    color: white;
    background-color: #263646;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 5000rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media only screen and (max-width: 690px) {
    #backGround {
        /* padding: 0.75rem; */
        width: 100vw;
        margin: 0px;
        max-width: 100%;
        border-radius: 0rem;
    }

    #header {
        font-size: 1.25rem;
        margin: 2rem 0rem 1rem 1rem;
    }

    #title {
        text-align: justify;
        font-size: 1rem;
        line-height: 1.375rem;
    }

    #content {
        font-size: 0.75rem;
        line-height: 1rem;
    }

    .reaction {
        font-size: 1rem;
        /* line-height: 1rem; */
    }
}
</style>