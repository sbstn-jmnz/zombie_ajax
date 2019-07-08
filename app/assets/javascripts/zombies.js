$(document).on('ready turbolinks:load', function () { 

  $("[name='commit']").click(function (event) {
    event.preventDefault();
    var zombie = $('#zombie_name').val();
    $.ajax({
      url: '/zombies',
      beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
      type: 'POST',
      dataType: 'script',
      data: { zombie: { name: zombie } }
    })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      $('#zombie_name').val('');
      console.log("complete");
    });
  })

  $('body').on('click', '.edit_zombie', function(event){
    event.preventDefault();
    $.ajax({
      url: this.href,
      beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
      type: 'GET',
      dataType: 'script'
    })
      .fail(function () {
        console.log("error");
      })
      .always(function () {
        $('#zombie_name').val('');
        console.log("complete");
      });    
  })

  $('body').on('click', '#edit_btn', function(event){
    event.preventDefault();
    var form = $('#edit_form');
    $.ajax({
      url: form.attr('action'),
      beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
      type: 'PATCH',
      dataType: 'script',
      data: form.serialize()
    })
      .fail(function () {
        console.log("error");
      })
      .always(function () {
        $('#myModal').modal('hide');
        console.log("complete");
      }); 
  })

  $('body').on('click', '.delete_zombie', function(event){
    event.preventDefault();

    if (confirm('Seguro que desear eliminar este indo Zombie')){
      $.ajax({
        url: this.href,
        beforeSend: function (xhr) { xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content')) },
        type: 'DELETE',
        dataType: 'script'
      })
        .fail(function () {
          console.log("error");
        })
        .always(function () {
          console.log("complete");
        });
      }
    });
  });