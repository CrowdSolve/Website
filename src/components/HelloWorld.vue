<template>
  <div id="backGround" class="bg-slate-800 m-auto p-4 text-white rounded-lg" v-if="daData != null">
    <!-- The user icon and name table -->
    <table id="questionHead" class="text-white text-left mb-5">
      <tr>
        <td>
          <img class="rounded-full h-7 w-7 inline-block ml-2 mr-2" v-bind:src="daData['user']['avatar_url']" />
        </td>
        <td>
          <div id="user-name" class="inline-block text-base">{{ daData['user']['login']
          }}&nbsp;&nbsp;●&nbsp;&nbsp;<span class="inline-block text-xs text-slate-500">{{ daData['created_at']
            }}</span>
          </div>
        </td>
      </tr>
    </table>
    <!-- Question content -->
    <!-- TITLE -->
    <div id="title" class="text-left text-3xl font-bold mb-5">{{ daData['title'] }}</div>
    <!-- MARKDOWN BODY -->
    <div id="body" class="text-left" v-html="daMarkDown"></div>
    <!-- COMMENTS COUNT -->
    <div class="text-right mt-2 text-slate-400 text-sm">{{ daData['comments'] }} Comments&nbsp;&nbsp;</div>
    <!-- Upper horizontal divider line -->
    <hr class="mb-2 mt-2 border-slate-500">
    <!-- facebook like buttons for share, comments and view in app -->
    <div class="text-xl">
      <button v-on:click='share' id="commentsHead"
        class="inline-block text-slate-400 hover:text-white p-1 pl-5 pr-5 rounded-xl hover:bg-slate-700 w-4/12">
        Share
      </button>
      <button v-on:click='getComments' id="commentsHead"
        class="inline-block text-slate-400 hover:text-white p-1 pl-5 pr-5 rounded-xl hover:bg-slate-700 w-4/12">
        Comments
      </button>
      <button v-on:click='viewInApp' id="commentsHead"
        class="inline-block text-slate-400 hover:text-white p-1 pl-5 pr-5 rounded-xl hover:bg-slate-700 w-4/12">
        View in app
      </button>
    </div>
    <!-- Lower horizontal divider line -->
    <hr class="mt-2 border-slate-500">
    <!-- Start of COMMENTS section -->
    <!-- COMMENTS headline -->
    <div v-show="isVisible" id="commentsHead" class=" text-left mt-5 text-4xl text-white mb-5">
      Comments
    </div>
    <!-- the actual comments done with a v-for loop -->
    <div id="commentsSection" v-show="isVisible" v-for="(item, index) in daComments" class="ml-5 text-white text-left">
      <table id="questionHead" class="text-white text-left">
        <tr class="m-auto">
          <td>
            <img class="rounded-full h-7 w-7 inline-block mr-2" v-bind:src="item['user']['avatar_url']" />
          </td>
          <td>
            <div id="user-name" class="inline-block text-base">{{ item['user']['login']
            }}&nbsp;&nbsp;●&nbsp;&nbsp;<span class="inline-block text-xs text-slate-500">{{ item['created_at']
              }}</span>
            </div>
          </td>
        </tr>
      </table>
      <div id="body" class="text-base text-left mt-3" v-html="createCommentsMarkdown(index)"></div>
      <hr class="mb-5 mt-5 border-slate-700" v-if="index < daComments.length - 1">
    </div>
  </div>
</template>

<script>
// import the marked function to enable transforming from markdown to actual html
import { marked } from 'marked'

export default {
  name: 'HelloWorld',
  data() {
    return {
      // define the variabels that will hold the data to show
      // BODY data
      daData: null,
      daMarkDown: null,
      // COMMENTS data
      daComments: null,
      daCommentsMarkDown: null,

      // comments toggle variable
      isVisible: false
    }
  },
  // What to do when the app just got loaded with the created function being async
  async created() {
    try {
      // Get the url of the page and get the last number in the link and extract it in a variable
      const theUrl = window.location.href.split("/")
      const pageNo = theUrl[theUrl.length - 1]
      // Fetch the data from the GITHUB API and decode its JSON into one of our variables defined above
      const theData = await fetch("https://api.github.com/repos/CrowdSolve/data/issues/" + pageNo)
      this.daData = await theData.json()

      // transform the body of the question from markdown to actual html with the marked function
      this.daMarkDown = marked(this.daData['body'])
      // console.log(this.daData)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    // Define a function to fetch the comments from the GITHUB API and JSON decode it when the comments button is pressed
    async getComments() {
      // change the state of the comments section visibility on click
      this.isVisible = !this.isVisible
      if (this.isVisible) {
        const theData = await fetch(this.daData['comments_url'])
        this.daComments = await theData.json()
      }
    },
    // Define a function to change the comments look from markdown to actual text
    createCommentsMarkdown(id) {
      return marked(this.daComments[id]['body'])
    },
    // Define a function to tell what the share button does
    share() {
      console.log("Shared!!!")
    },
    // Define a function to tell what the view in app button does
    viewInApp() {
      console.log("Viewed in App!!!")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#backGround {
  max-width: 50rem;
  margin: 0rem min(100px, auto) 0rem min(100px, auto);
}

td {
  height: 100%;
  text-align: center;
  margin: auto;
}
</style>
