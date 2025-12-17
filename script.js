const { createApp } = Vue;

createApp({
  data() {
    return {
      participants: [],
      newParticipant: { name: "", wishlist: "" },
      started: false,
      selectedParticipant: null
    };
  },

  methods: {
    addParticipant() {
      const name = this.newParticipant.name.trim();
      const wishlist = this.newParticipant.wishlist
        .split(",")
        .map(item => item.trim())
        .filter(item => item);

      if (!name) {
        alert("Please enter a name");
        return;
      }

      this.participants.push({
        name,
        wishlist,
        assignedTo: null
      });

      this.newParticipant.name = "";
      this.newParticipant.wishlist = "";
    },

    removeParticipant(index) {
      this.participants.splice(index, 1);
    },

    startGame() {
      if (this.participants.length < 2) {
        alert("Need at least 2 people");
        return;
      }

      let shuffled;
      let valid = false;

      // Shuffle until no one is assigned themselves
      while (!valid) {
        shuffled = [...this.participants];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        valid = !this.participants.some((p, i) => p.name === shuffled[i].name);
      }

      // Assign Secret Santa
      this.participants.forEach((p, i) => {
        p.assignedTo = shuffled[i];
      });

      this.started = true;
    },

    selectParticipant(participant) {
      this.selectedParticipant = participant;
    },

    resetGame() {
      this.participants = [];
      this.started = false;
      this.selectedParticipant = null;
    }
  }
}).mount("#app");
