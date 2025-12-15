const { createApp } = Vue;

createApp({
  data() {
    return {
      username: "",
      password: "",
      error: "",
      loggedIn: false,
      currentUser: null,

      // "Database" of users
      users: [
        {
          username: "alyson",
          password: "music123",
          name: "Alyson",
          website: "https://www.classicsforkids.com"
        },
        {
          username: "alex",
          password: "sonata456",
          name: "Alex",
          website: "https://www.musictheory.net"
        },
        {
          username: "jordan",
          password: "piano789",
          name: "Jordan",
          website: "https://www.muted.io"
        }
      ]
    };
  },

  mounted() {
    // Keep user logged in on refresh
    const savedUser = localStorage.getItem("secretUser");
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.loggedIn = true;
    }
  },

  methods: {
    login() {
      this.error = "";

      const user = this.users.find(
        u =>
          u.username === this.username &&
          u.password === this.password
      );

      if (user) {
        this.loggedIn = true;
        this.currentUser = user;
        localStorage.setItem("secretUser", JSON.stringify(user));
      } else {
        this.error = "Invalid username or password";
      }
    },

    logout() {
      this.loggedIn = false;
      this.currentUser = null;
      this.username = "";
      this.password = "";
      localStorage.removeItem("secretUser");
    }
  }
}).mount("#app");
