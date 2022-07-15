$('#country-dropdown').on('change', function() {
    var country_id = this.value;
    
    $("#state-dropdown").html('');

    $.ajax({
        
        url: "http://localhost:3000/get-states-by-country",
        
        type: "POST",
        
        data: {
            name: 'country',
            country_id: country_id,
        },

        dataType: 'json',
        success: function(result) {
            $('#state-dropdown').html('<option value="">Select State</option>');

            $.each(result.states, function(key, value) {
                $("#state-dropdown").append('<option value="' + value.id + '">' + value.name + '</option>');
            });

            $('#city-dropdown').html('<option value="">Select State First</option>');
        }
    });
});