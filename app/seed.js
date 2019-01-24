const db = require("./models");


var entries_list = [
        {
            title: "Struggling today",
            content: "",
            date: 01/03/19,
            trigger: true
        },

        {
            title: "Today was better",
            content: "",
            date: 01/04/19,
            trigger: false
        },
        
    ];
  
  
var user_list = [
        {
            email: "test1@email.com",
            entries: ["Struggling today", "Today was better"],
        }
    ];  
  
  simpleCreate(db.Entry, entries_list, "entries");
  simpleCreate(db.User, user_list, "users");
  
  function simpleCreate(DB, object_list, name) {
    DB.deleteMany({}, (err, objects) => {
      DB.create(object_list, (err, objects) => {
        if (err) {
          return console.log("err", err);
        }
        console.log("deleted all", name);
        console.log("created", objects.length, name);
      });
    });
  }