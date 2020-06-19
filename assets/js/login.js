$(function() {
    $('#title_reg').on('click', function() {

        $('#login_box').hide();
        $('#reg_box').show();

    });
    $('#title_login').on('click', function() {
        $('#login_box').show();
        $('#reg_box').hide();
    });
});