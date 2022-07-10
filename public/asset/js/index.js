$(function(){
    $("#search-button").on("click", function(){
        var value = $("#cari_deskripsi_brg").val().toLowerCase();
        $(".clickable-rows").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1);
        });
    });

    $('#input_imgfile').on("change", () => {
        var file = $('#input_imgfile')[0].files[0];

        if(file){
            const fileReader = new FileReader();

            $(".image-wrapper").css("display", "none");
            $("#image-uploaded").css("display", "block");

            fileReader.addEventListener("load", function(){
                console.log(this);
                $("#image-uploaded").attr("src", this.result);
            })

            fileReader.readAsDataURL(file);
        }
    });

    $('#pemasukan_reset').on('click', function(){
        $("#image-uploaded").css("display", "none");
        $(".image-wrapper").css("display", "flex");
    }) 
    
    var tb_rows_length = $('.clickable_rows').length; // <= checked
    
        $('input[id^="select-item"]').on('click', function(){
            //let checkbox_id = this.id;
            //let table_row = $(this).closest('tr').attr('id');
            $(this).closest('tr').toggleClass('bg-primary').toggleClass('text-light');
            // console.log(table_row);
            
        })

});
