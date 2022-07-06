$(function(){
    $("#search-button").on("click", function(){
        var value = $("#cari_deskripsi_brg").val().toLowerCase();
        $("#tb_pemasukan tbody tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1);
        });
    });
});

// $("#input-imgfile") => input file
// $("#img-preview") => image preview container
// $("#img-preview .image-uploaded") => Preview Image
// $("#img-preview .image-wrapper .text-default-image") => Default Text

/*
$("#input-imgfile")
*/