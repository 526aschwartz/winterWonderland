// Import the createApp function from Vue
const { createApp } = Vue;

// Create and mount the Vue application
createApp({
  // -----------------------------
  // DATA: stores all reactive state
  // -----------------------------
  data() {
    return {
      // Array to store all participants
      participants: [],

      // Object to store input values for a new participant
      newParticipant: {
        name: "",
        password: "",
        wishlist: ""
      },

      // Controls whether the game has started
      started: false,

      // Stores the currently selected participant after login
      selectedParticipant: null
    };
  },

  // -----------------------------
  // METHODS: functions triggered by user actions
  // -----------------------------
  methods: {

    // Add a new participant to the list
    addParticipant() {
      // Remove extra spaces from name and password
      const name = this.newParticipant.name.trim();
      const password = this.newParticipant.password.trim();

      // Convert wishlist string into an array
      const wishlist = this.newParticipant.wishlist
        .split(",")               // split by commas
        .map(item => item.trim()) // remove extra spaces
        .filter(item => item);    // remove empty items

      // Validate required fields
      if (!name || !password) {
        alert("Please enter a name and password");
        return;
      }

      // Add participant object to the array
      this.participants.push({
        name,
        password,
        wishlist,
        assignedTo: null // will be set when game starts
      });

      // Clear input fields after adding
      this.newParticipant.name = "";
      this.newParticipant.password = "";
      this.newParticipant.wishlist = "";
    },

    // Remove a participant by index
    removeParticipant(index) {
      this.participants.splice(index, 1);
    },

    // Start the Secret Santa game
    startGame() {
      // Require at least two participants
      if (this.participants.length < 2) {
        alert("Need at least 2 people");
        return;
      }

      let shuffled;
      let valid = false;

      // Shuffle until no one is assigned to themselves
      while (!valid) {
        // Copy the participants array
        shuffled = [...this.participants];

        // Fisher-Yates shuffle algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Check that no participant is assigned to themselves
        valid = !this.participants.some(
          (p, i) => p.name === shuffled[i].name
        );
      }

      // Assign Secret Santa matches
      this.participants.forEach((p, i) => {
        p.assignedTo = shuffled[i];
      });

      // Switch to game screen
      this.started = true;
    },

    // -----------------------------
    // PASSWORD-PROTECTED SELECTION
    // -----------------------------
    selectParticipant(participant) {
      // Ask user to enter their password
      const entered = prompt(`Enter password for ${participant.name}`);

      // Check if password matches
      if (entered === participant.password) {
        this.selectedParticipant = participant;
      } else {
        alert("❌ Incorrect password");
      }
    },

    // Reset the game and clear all data
    resetGame() {
      this.participants = [];
      this.started = false;
      this.selectedParticipant = null;
    }
  }

// Mount the Vue app to the #app element
}).mount("#app");
