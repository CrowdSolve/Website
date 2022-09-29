<template>
    <div id="backGround" class="py-2 m-auto text-white" v-if="daData != null">
        <div @click="$router.push('/questions/'+question['number'])" v-for="(question, index) in daData"
            class="m-3 bg-slate-800 rounded-2xl">
            <div v-if="daImages[index] != null"
                style="width: 100%; height: 45vw; max-height: 20rem; background-size: cover">
                <img class="h-full min-w-full object-cover rounded-t-2xl" :src="daImages[index]" />
            </div>
            <div class="p-3">
                <div id="title" style="text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        text-align: left;" class="font-bold text-3xl">
                    {{ daData[index]['title'] }}
                </div>
                <br>
                <div id="content" v-html="daMarkdown[index]"></div>
                <div class="text-left">...</div>
                <table id="questionHead" class="text-white text-left mt-5">
                    <tr>
                        <td>
                            <img class="rounded-full h-5 w-5 inline-block ml-1 mr-1"
                                v-bind:src="daData[index]['user']['avatar_url']" />
                        </td>
                        <td>
                            <div id="user-name" class="inline-block text-sm">{{ daData[index]['user']['login']
                            }}&nbsp;&nbsp;●&nbsp;&nbsp;<span class="inline-block text-xs text-slate-500">{{
                                new Date(daData[index]['created_at']).toDateString()
                                }}</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MainPage",
    props: ['md'],
    data() {
        return {
            daData: null,
            daMarkdown: [],
            daImages: [],
            daDate: null
        }
    },
    async created() {
        const theData = await fetch("https://api.github.com/repos/CrowdSolve/data/issues")
        this.daData = await theData.json()

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
    }
}
</script>

<style scoped>
#backGround {
    max-width: 50rem;
    /* margin: 0rem min(100px, auto) 0rem min(100px, auto); */
}

#content {
    text-overflow: clip;
    white-space: nowrap;
    overflow: hidden;
    max-height: 5rem;
    text-align: left;
    background: -webkit-linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
}

@media only screen and (max-width: 690px) {
    #backGround {
        /* padding: 0.75rem; */
        width: 100vw;
        margin: 0px;
        max-width: 100%;
        border-radius: 0rem;
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
}
</style>