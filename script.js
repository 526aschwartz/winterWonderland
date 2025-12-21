const { createApp } = Vue;

createApp({
  data() {
    return {
      participants: [],
      newParticipant: {
        name: "",
        password: "",
        wishlist: ""
      },
      started: false,
      selectedParticipant: null
    };
  },

  methods: {
    addParticipant() {
      const name = this.newParticipant.name.trim();
      const password = this.newParticipant.password.trim();
      const wishlist = this.newParticipant.wishlist
        .split(",")
        .map(item => item.trim())
        .filter(item => item);

      if (!name || !password) {
        alert("Please enter a name and password");
        return;
      }

      this.participants.push({
        name,
        password,
        wishlist,
        assignedTo: null
      });

      this.newParticipant.name = "";
      this.newParticipant.password = "";
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

      while (!valid) {
        shuffled = [...this.participants];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        valid = !this.participants.some(
          (p, i) => p.name === shuffled[i].name
        );
      }

      this.participants.forEach((p, i) => {
        p.assignedTo = shuffled[i];
      });

      this.started = true;
    },

    // 🔐 PASSWORD PROTECTION
    selectParticipant(participant) {
      const entered = prompt(`Enter password for ${participant.name}`);

      if (entered === participant.password) {
        this.selectedParticipant = participant;
      } else {
        alert("❌ Incorrect password");
      }
    },

    resetGame() {
      this.participants = [];
      this.started = false;
      this.selectedParticipant = null;
    }
  }
}).mount("#app");
