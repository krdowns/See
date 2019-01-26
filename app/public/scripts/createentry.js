// ################### CRUD FUNCTIONALITY ######################//

/// CREATE FORM ///
$('#save_entry').on('click', function (e) {
    e.preventDefault();
    var elements = $('#newEntryForm')[0].elements
    var title = elements[0].value
    var content = elements[1].value
    console.log(title,content)
  $.ajax({
    url: '/api/entries',
    method: 'POST',
    data: {
        title,
        content
    },
      success: function(res) {
        console.log(res)
        console.log( `${res} has been posted`);
      },

      error: onError
    });  
});

////GET ALL ENTRIES AND APPEND TO PAGE////
  var entryUrl = `/api/entries`

  $.ajax({
      method: 'GET',
      url: entryUrl,
      success: onSuccess,
      error: onError,
  });

  function onError (err) {
      console.log(err);
  }

  function onSuccess (entries) {
      console.log(entries);
      $('.entry-list').empty();
      entries.forEach(entry => {
          let entryCard1 = `
            <div class="entry-card" data-id=${entry._id}>
                <div class="textContainer">
                    <div class="textWrapper">
                    <p>${entry.title}</p>
                    <p>${entry.content}</p>
                    <p>${entry.date}</p>
                    <p>${entry.trigger}</p>
                </div>
            </div>`

          $('.entry-list').append(entryCard1);
      });
      }



// DELETE ENTRIES //

  $('#entry').on('click', '.deleteEntry', function(e){
    e.preventDefault();

    entryId = $('#deleteEntry').data().id
    console.log(entryId)
    var entriesUrl = `/api/entries/${entryId}`
    console.log(entriesUrl)

    $.ajax({
        method: 'DELETE',
        url: entriesUrl,
        success: onSuccess,
        error: onError,
    });
        function onError ( err ) {
            console.log( err );
        }
        function onSuccess (entry) {
        console.log(`Entry Deleted:`, entry)
        $('#entry').addClass('hidden')
        alert('Your entry was deleted')
        }
    })