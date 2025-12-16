const { createApp } = Vue;

createApp({
  data() {
    return {
      participants: [],
      newParticipant: { name: "", wishlist: "" },
      started: false
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

      this.participants.push({ name, wishlist, assignedTo: null });
      this.newParticipant.name = "";
      this.newParticipant.wishlist = "";
    },

    removeParticipant(index) {
      this.participants.splice(index, 1);
    },

    startGame() {
      if (this.participants.length < 2) {
        alert("You need at least 2 participants");
        return;
      }

      // Shuffle array for random assignment
      const shuffled = [...this.participants];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Assign Secret Santa
      for (let i = 0; i < this.participants.length; i++) {
        this.participants[i].assignedTo = shuffled[(i + 1) % shuffled.length];
      }

      this.started = true;
    },

    resetGame() {
      this.participants.forEach(p => (p.assignedTo = null));
      this.started = false;
    }
  }
}).mount("#app");
