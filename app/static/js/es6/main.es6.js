(function() {
    'use strict';

    $(document).ready(initialize);

    function initialize() {
        $('.register').click(register);
    }

    function register(e) {
        $('#registration').css('display', 'block');
        e.preventDefault();
    }


})();
