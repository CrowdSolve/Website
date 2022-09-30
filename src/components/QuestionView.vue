<template>
  <div id="backGround" class="bg-slate-800 p-4 m-auto text-white rounded-lg" v-if="daData != null">
    <!-- The user icon and name table -->
    <table id="questionHead" class="text-white text-left mb-5">
      <tr>
        <td>
          <img class="rounded-full h-7 w-7 inline-block ml-2 mr-2" v-bind:src="daData['user']['avatar_url']" />
        </td>
        <td>
          <div id="user-name" class="inline-block text-base">{{ daData['user']['login']
          }}&nbsp;&nbsp;●&nbsp;&nbsp;<span class="inline-block text-xs text-slate-500">{{
            // Date(daData['created_at'])
            daDate
            }}</span>
          </div>
        </td>
      </tr>
    </table>
    <!-- Question content -->
    <!-- TITLE -->
    <div id="title" class="text-left text-3xl font-bold mb-5">{{ daData['title'] }}</div>
    <!-- MARKDOWN BODY -->
    <div class="theBody" style="overflow: auto">
      <div id="body" class="text-justify" v-html="daMarkDown"></div>
    </div>
    <!-- <MarkDown class="text-left" :source="daMarkDown" /> -->
    <!-- <math-jax :latex="daMarkDown"></math-jax> -->
    <!-- COMMENTS COUNT -->
    <div class="text-right mt-2 text-slate-400 text-sm">{{ daData['comments'] }} Comments&nbsp;&nbsp;</div>
    <!-- Upper horizontal divider line -->
    <hr class="mb-2 mt-2 hori-sep border-slate-500">
    <!-- facebook like buttons for share, comments and view in app -->
    <div class="text-xl">
      <button v-if="isAndroid" @click='viewInApp' id="commentsHead"
        class="inline-block text-slate-400 hover:text-white rounded-xl hover:bg-slate-700 w-4/12">
        <div class="material-symbols-outlined">
          phone_android
        </div>
        View in app
      </button>
      <button v-on:click='getComments' id="commentsButton"
        class="inline-block text-slate-400 hover:text-white rounded-xl hover:bg-slate-700">
        <div class="material-symbols-outlined">
          chat_bubble
        </div>
        Comments
      </button>
      <button v-on:click='share' id="shareButton"
        class="inline-block text-slate-400 hover:text-white rounded-xl hover:bg-slate-700">
        <div class="material-symbols-outlined">
          share
        </div>
        Share
      </button>
    </div>
    <!-- Lower horizontal divider line -->
    <hr class="hori-sep mt-2 border-slate-500">
    <!-- Start of COMMENTS section -->
    <!-- COMMENTS headline -->
    <!-- when comments exist show the below tag -->
    <div id="commentsTitle" v-if="isVisible && daData['comments'] != '0'"
      class=" text-left mt-5 text-4xl text-white mb-5">
      Comments
    </div>
    <!-- when no comments exist show the below tag -->
    <div v-if="isVisible && daData['comments'] == '0'" class="text-center text-base text-slate-400 mt-5">
      No comments on this question yet!
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
      <div
        class="theBody scrollbar scrollbar-thumb-custom scrollbar-track-custom-light overflow-y-scroll scrollbar-thin"
        style="overflow: auto;">
        <div id="body" class="text-base text-left mt-3" v-html="createCommentsMarkdown(index)"></div>
      </div>
      <hr class="mb-5 mt-5 border-slate-700" v-if="index < daComments.length - 1">
    </div>

  </div>
</template>

<script>
var pageNo = 0

export default {
  name: 'QuestionView',
  props: ['isAndroid', 'md'],
  data() {
    return {
      // define the variabels that will hold the data to show
      // BODY data
      daData: null,
      daMarkDown: null,
      daDate: null,
      // COMMENTS data
      daComments: null,
      daCommentsMarkDown: null,

      // comments toggle variable
      isVisible: false,
    }
  },
  // What to do when the app just got loaded with the created function being async
  async created() {
    const theUrl = window.location.href.split("/")
    pageNo = theUrl[theUrl.length - 1]
    console.log()
    this.$emit("Android", this.isAndroid)
    try {
      // Get the url of the page and get the last number in the link and extract it in a variable

      // Fetch the data from the GITHUB API and decode its JSON into one of our variables defined above
      const theData = await fetch("https://api.github.com/repos/CrowdSolve/data/issues/" + pageNo)
      this.daData = await theData.json()

      this.daDate = new Date(this.daData['created_at']).toDateString()

      // transform the body of the question from markdown to actual html with the marked function
      this.daMarkDown = this.daData['body']
      this.daMarkDown = this.md.render(this.daMarkDown);
    } catch (err) {
      console.log(err)
    }

    // Default Values for Page
    document.title = this.daData['title']
  },
  updated() {
    const daCommentsButton = document.getElementById("commentsButton")
    const daShareButton = document.getElementById("shareButton")
    if (!this.isAndroid) {
      daCommentsButton.classList.add("w-6/12", "h-12")
      daShareButton.classList.add("w-6/12", "h-12")
    } else {
      daCommentsButton.classList.add("w-4/12")
      daShareButton.classList.add("w-4/12")
    }
  },
  methods: {
    recieveShow(value) {
      this.notificationShowing = value
    },
    // Define a function to fetch the comments from the GITHUB API and JSON decode it when the comments button is pressed
    async getComments() {
      // change the state of the comments section visibility on click
      this.isVisible = !this.isVisible
      if (this.isVisible) {
        const theData = await fetch(this.daData['comments_url'])
        this.daComments = await theData.json()
        window.scrollBy({
          top: 5000,
          left: 0,
          behavior: 'smooth'
        })
      }
    },
    // Define a function to change the comments look from markdown to actual text
    createCommentsMarkdown(id) {
      return this.md.render(this.daComments[id]['body'])
    },
    // Define a function to tell what the share button does
    share() {
      const area = document.createElement('textarea')
      document.body.appendChild(area)
      area.textContent = window.location.href
      area.select();
      document.execCommand('copy')
      document.body.removeChild(area)
      if (!this.isAndroid) {
        this.$toast.show("Share link copied to clipboard", {
          type: 'default',
          position: 'bottom-right',
          duration: 1000
        })
      } else {
        this.$toast.show("Share link copied to clipboard", {
          type: 'default',
          position: 'bottom',
          duration: 1000
        })
      }
    },
    // Define a function to tell what the view in app button does
    viewInApp() {
      window.open("https://csolve.page.link/?link=https://crowdsolve.lasheen.dev/questions/" + pageNo + "&apn=dev.lasheen.crowdsolve")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#backGround {
  max-width: 50rem;
  border-radius: 0.5rem;
  /* margin: 0rem min(100px, auto) 0rem min(100px, auto); */
}

td {
  height: 100%;
  text-align: center;
  margin: auto;
}

/* Track */
.theBody::-webkit-scrollbar-track {
  background: rgb(37, 42, 48);
}

/* Handle */
.theBody::-webkit-scrollbar-thumb {
  background: #464957;
}

/* Handle on hover */
.theBody::-webkit-scrollbar-thumb:hover {
  background: #69787c;
}

button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 690px) {
  #backGround {
    padding: 0.75rem;
    width: 100vw;
    margin: 0px;
    max-width: 100%;
    border-radius: 0rem;
  }

  #title {
    text-align: justify;
    font-size: 1.3rem;
    line-height: 1.375rem;
  }

  button {
    font-size: 3.5vw;
  }

  button>div {
    font-size: 3.5vw;
  }

  .hori-sep {
    margin-top: 1vw;
    margin-bottom: 1vw;
  }

  #commentsTitle {
    font-size: 1.5rem;
  }
}

button>div {
  margin-right: 10px;
}
</style>
