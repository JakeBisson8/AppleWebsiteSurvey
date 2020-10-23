//JQuery that will listen and action the survey form
$(document).ready(function(){
    $('form').on('submit', function(){
        $.ajax({
            type: 'POST',
            url: '/appleSurvey',
            data: $(this).serializeArray(),
            success: function(data) {
                //disable the submit button
                $('#submitButton').removeClass("btn-primary");
                $('#submitButton').addClass("btn-success");
                $('#submitButton').prop("disabled", "true");
                $('#submitButton').text("Results Sent");
            }
        });
        return false;
    });
});