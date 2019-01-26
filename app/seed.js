const db = require("./models");


var entry_list = [
        {
          title: "Struggling today",
          content: "",
          date:"01/03/19",
          trigger: true
        },

        {
          title: "Today was better",
          content: "",
          date: "01/04/19",
          trigger: false
        },

        {
          title: "I feel alone",
          content: "",
          date: "1/06/19",
          trigger: true
        }
        
    ];
  
  
var user_list = [
        {
          email: "test1@email.com",
          password: "password",
          entries: ["Struggling today", "Today was better", "I feel alone"],
        }
    ];  
  
// SEED ENTRIES
    db.Entry.remove({}, function(err, entry) {
        console.log('removed all entries');
        db.Entry.create(entry_list, function(err, savedEntries){
            if(err){
                console.log(err);
                return;
            }
            console.log("seeding entries");
            console.log("create", entry_list.length, "entries");
        })
    });

// SEED USERS
    db.User.remove({}, function(err, user) {
    console.log('removed all users');
    db.User.create(user_list, function(err, savedUsers){
            if(err){
                console.log(err);
                return;
            }
            console.log("seeding users");
            console.log("create", user_list.length, "users");
        })
    });