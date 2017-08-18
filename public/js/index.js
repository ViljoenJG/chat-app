axios.get('/roomlist')
.then(function (resp) {
    jQuery('#roomList').html('');
    resp.data.forEach(function(room) {
        jQuery('#roomList').append('<option value="' + room + '">');
    });
})
.catch(function (error) {
  console.log(error);
});