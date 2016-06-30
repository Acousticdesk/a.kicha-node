
define([], function () {
    var homeDirectives = {};

    /**
     * Checks if user filled correctly formatted password
     * @returns {{restrict: string, require: string, link: linkHander}}
     */
    homeDirectives.neofitPassword = function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: linkHander
            };

            function linkHander (scope, element, attrs, ngFormController) {
                ngFormController.$parsers.push(isCorrectPasswordTypeParser);

                function isCorrectPasswordTypeParser (text) {
                    ngFormController.$setValidity('isCorrectPasswordType', false);

                    var isCapitalLetter = text.match(/^[A-Z]/),
                        isNumbers = text.match(/\d+/),
                        isValidLength = text.length >= 8;

                    if (isCapitalLetter && isCapitalLetter.length && isNumbers && isNumbers.length && isValidLength)
                        ngFormController.$setValidity('isCorrectPasswordType', true);

                    return text;
                }
            }

        };

    homeDirectives.showPassword = function () {
        return {
            restrict: 'A',
            link: linkHandler
        };

        function linkHandler (scope, element, attrs, controller) {
            $(document).on('mouseup', handleKeyup);
            element.on('mousedown', handleClick);
        }

        function handleClick (e) {
            var $this = $(this),
                $siblingInput = $this.prev();

            $siblingInput.attr('type', 'text');

            $this = null;
            $siblingInput = null;
        }

        function handleKeyup (e) {
            $('.password-input').attr('type', 'password');
        }

    };

    return homeDirectives;
});
