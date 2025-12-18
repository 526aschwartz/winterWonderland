// Import createApp from Vue
const { createApp } = Vue;

// Create and mount the Vue application
createApp({
  // Reactive data for the app
  data() {
    return {
      // Array that stores all participants
      participants: [],

      // Temporary object for the input fields
      newParticipant: {
        name: "",
        wishlist: ""
      },

      // Tracks whether the game has started
      started: false,

      // Stores the currently selected participant
      selectedParticipant: null
    };
  },

  methods: {
    // Adds a new participant to the list
    addParticipant() {
      // Remove extra spaces from the name
      const name = this.newParticipant.name.trim();

      // Convert wishlist string into an array
      const wishlist = this.newParticipant.wishlist
        .split(",")               // Split by commas
        .map(item => item.trim()) // Remove extra spaces
        .filter(item => item);    // Remove empty entries

      // Prevent adding a participant without a name
      if (!name) {
        alert("Please enter a name");
        return;
      }

      // Add participant to the participants array
      this.participants.push({
        name,
        wishlist,
        assignedTo: null // Will hold their Secret Santa assignment
      });

      // Clear the input fields after adding
      this.newParticipant.name = "";
      this.newParticipant.wishlist = "";
    },

    // Removes a participant by index
    removeParticipant(index) {
      this.participants.splice(index, 1);
    },

    // Starts the Secret Santa game
    startGame() {
      // Ensure there are at least 2 players
      if (this.participants.length < 2) {
        alert("Need at least 2 people to play");
        return;
      }

      // Variables for shuffling and validation
      let shuffled;
      let valid = false;

      // Keep shuffling until no one is assigned themselves
      while (!valid) {
        // Create a copy of the participants array
        shuffled = [...this.participants];

        // Fisher–Yates shuffle algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Check that no one is assigned to themselves
        valid = !this.participants.some(
          (p, i) => p.name === shuffled[i].name
        );
      }

      // Assign each participant their Secret Santa
      this.participants.forEach((p, i) => {
        p.assignedTo = shuffled[i];
      });

      // Mark the game as started
      this.started = true;
    },

    // Selects a participant to reveal their assignment
    selectParticipant(participant) {
      this.selectedParticipant = participant;
    },

    // Resets the entire game
    resetGame() {
      this.participants = [];
      this.started = false;
      this.selectedParticipant = null;
    }
  }
})
// Mount the Vue app to the #app element
.mount("#app");
