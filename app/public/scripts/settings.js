    
    
    $('#save-contacts').on('click', function (e) {
    e.preventDefault();
    var elements = $('#newContactForm')[0].elements[0]
    console.log(elements)
    var email = elements.value
    var user = localStorage.userID
    
        $.ajax({
        url: '/api/contacts',
        method: 'POST',
        data: {
            email,
            user
        },
        error: function (err) {
            console.log(err);
        }
        });
    });
  
window.onload = function(e) {
    $.ajax({
        url: '/api/contacts',
        method: 'GET',
        success: handleSuccess,
        error: handleError
    });

    function handleSuccess(contacts) {
        console.log(contacts)
        var count= 1;
        contacts.data.forEach(singleContact => {
            console.log(singleContact.email)
           
            $(".current-contacts-container").append(`
            <div class="contact-container">
                <ul class="contact-list">
                    <li class="contact">
                        <span id="update-contact_${count}">${singleContact.email}</span>
                        <button id="delete-button" class="delete-contact-button">delete</button>
                    </li>
                </ul>
            </div>
            `);

            $('div.current-contacts-container').on('click',`span[id=update-contact_${count}]`,function(){
                console.log("here changing")
               $initProfileVal= $(this).html();
               $(this).replaceWith($(`<input id='update-contact_${count}' value='${$(this).html()}' required>`));
               $(`${'div.current-contacts-container'} input[id=update-contact_${count}]`).focus();
           });
        
            $('div.current-contacts-container').on('blur',`input[id=update-contact_${count}]`,function(){
               var $text= $(this).val();
               if ($text=='') return;
               $(this).replaceWith($(`<span id='update-contact_${count}'>${$text}</span>`));
               if ($text.trim()==$initProfileVal.trim()) return;
               var dataObj={}; dataObj["email"]= $text;

                $.ajax({
                    type: "PUT",
                    url: "/api/contacts/"+singleContact._id,
                    data: JSON.stringify(dataObj),
                    contentType: "application/json",
                    success: function() {
                        // var key= Object.getOwnPropertyNames(output)[0];
                        // if (key=='username') { $('i[name=user]').html(output[key]); }
                        // $(`#${key}`).html(output[key]);
                    },
                    'error': function(err1,err2,err3) { console.log(err1,err2,err3); }
                });

                $(`#update-contact_${count}`).on('click', '.delete-contact-button', function () {
                    console.log('clicked');
                    var id = $(this).attr('id');
                    console.log(id);
                    $.ajax({
                        method: 'DELETE',
                        url: `/contacts/:id`,
                        success: deleteSuccess,
                        error: handleError
                    });
                });
            
                function deleteSuccess(json) {
                    window.location.reload();
                    console.log(json);
                };
            });

            count++;
        })
    };

    function handleError(e) {
        console.log('error', e);
        $('.current-contacts-container').text('Failed to load.');
    }; 


}