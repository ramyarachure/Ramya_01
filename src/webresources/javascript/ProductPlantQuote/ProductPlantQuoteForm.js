var ProductPlantQuoteForm = (function  () {
    "use strict";

    var STATUS_COLUMN = "tkg_factoryquotestatus";

    var STATUS = {
        OPEN : 0,
        RESPONDED : 1,
        IMPORTED : 2,
        CANCELLED : 3
    };

    var RESPONSE_FIELDS = [
        "tkg_deliverydate",
        "tkg_leadtime",
        "tkg_remarks",
        "tkg_responsecomment",
        "tkg_requester",
        "tkg_responder"
    ];

    function onLoad(executionContext) {

        applyStatusControl(executionContext);
    }

    function applyStatusControl(executionContext) {

        var formContext = executionContext.getFormContext();

        var statusAttribute = formContext.getAttribute(STATUS_COLUMN);

        if(!statusAttribute) {

            console.log("Status column not found: " + STATUS_COLUMN);

            return;
        }

        var currentStatus = statusAttribute.getValue();

        var recordEditable = currentStatus === STATUS.OPEN;

        lockUnlockFields(
            formContext,
            !recordEditable
        );

    }

    function lockUnlockFields(formContext, lockFields) {
        RESPONSE_FIELDS.forEach(function (fieldName) {

            var control = formContext.getControl(fieldName);

            if (control) {
                control.setDisabled(lockFields);
            }
        });
    }

    return {
        onLoad : onLoad,
        applyStatusControl : applyStatusControl
    };
})();