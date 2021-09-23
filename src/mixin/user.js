import { mapGetters } from 'vuex'
const user = {
  computed: {
    ...mapGetters({
      creatorName: 'name',
      creatorId: 'token'
    })
  }
}

export default user
