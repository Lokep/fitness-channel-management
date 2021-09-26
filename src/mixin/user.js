import { mapGetters } from 'vuex'
const user = {
  computed: {
    ...mapGetters({
      creatorName: 'name',
      creatorId: 'token',
      editorName: 'name',
      editorId: 'token'
    })
  }
}

export default user
