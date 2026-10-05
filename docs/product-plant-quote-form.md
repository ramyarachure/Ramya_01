# Product Plant Quote Form Script

The `ProductPlantQuoteForm.js` web resource controls whether selected response fields can be edited on a Product Plant Quote form. It uses the quote's status to help prevent accidental changes after the response has been submitted or the record has moved on in the workflow.

## Real-world purpose

A purchasing team may collect a supplier's delivery date, lead time, and comments while preparing a quote response. Once that response is submitted or the quote is otherwise finalized, those details should not be casually changed. When the form opens, this script checks the quote's current status and enables or disables the response controls to reflect that workflow.

## What the script does

1. The form's `onLoad` handler calls `applyStatusControl`.
2. `applyStatusControl` reads the `tkg_factoryquotestatus` column.
3. If the status is `OPEN` (`0`), the listed controls are enabled.
4. For any other status (`RESPONDED` (`1`), `IMPORTED` (`2`), or `CANCELLED` (`3`)), the listed controls are disabled.
5. If the status column is unavailable, the script writes a message to the browser console and stops. If an individual field control is not present on the form, that field is skipped.

## Fields affected

- `tkg_deliverydate`
- `tkg_leadtime`
- `tkg_remarks`
- `tkg_responsecomment`
- `tkg_requester`
- `tkg_responder`

## Form setup

Add the JavaScript web resource to the Product Plant Quote form libraries and register `ProductPlantQuoteForm.onLoad` as a form `OnLoad` event handler. Enable **Pass execution context as first parameter** so the script can access the form context.

## Important limitation

Disabling controls is a user-interface behavior, not an authorization or data-integrity boundary. Enforce rules that must not be bypassed with appropriate Dataverse security and server-side validation as well.
