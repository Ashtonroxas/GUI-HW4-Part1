/**
 * Name: Ashton Roxas
 * Date: 11/26/2025
 * File: script.js
 *
 * Ashton Roxas, UMass Lowell Computer Science, ashton_roxas@student.uml.edu
 */

const MIN_ALLOWED_VAL = -50;
const MAX_ALLOWED_VAL = 50;

$(document).ready(function() {
    $.validator.addMethod("greaterThanEqual", function(value, element, params) {
        const minElementValue = $(params).val();

        return this.optional(element) || (Number(value) >= Number(minElementValue));
    }, function(params, element) {
        const label = $(element).closest('.input-row').find('label').text().replace(':', '');
        const partnerLabel = $(params).closest('.input-row').find('label').text().replace(':', '');
        return `${label} must be equal to or greater than ${partnerLabel}. Please increase the end value.`;
    });

    // STEP 2: Initialize jQuery Validation Plugin
    $("#rangeForm").validate({
        submitHandler: function(form) {
            renderTable();
            return false;
        },

        rules: {
            colStart: {
                required: true,
                number: true,
                min: MIN_ALLOWED_VAL,
                max: MAX_ALLOWED_VAL
            },
            colEnd: {
                required: true,
                number: true,
                min: MIN_ALLOWED_VAL,
                max: MAX_ALLOWED_VAL,
                greaterThanEqual: "#colStart" 
            },
            rowStart: {
                required: true,
                number: true,
                min: MIN_ALLOWED_VAL,
                max: MAX_ALLOWED_VAL
            },
            rowEnd: {
                required: true,
                number: true,
                min: MIN_ALLOWED_VAL,
                max: MAX_ALLOWED_VAL,
                greaterThanEqual: "#rowStart" 
            }
        },

        messages: {
            colStart: {
                required: "Missing value! Please enter the starting column number.",
                number: "Must be a number. Integers only (e.g., 5 or -5).",
                min: `Value is too small. Enter a value from ${MIN_ALLOWED_VAL} to ${MAX_ALLOWED_VAL}.`,
                max: `Value is too large. Enter a value from ${MIN_ALLOWED_VAL} to ${MAX_ALLOWED_VAL}.`
            },
            colEnd: {
                required: "Missing value! Please enter the ending column number.",
                number: "Must be a number. Integers only (e.g., 5 or -5).",
                min: `Value is too small. Enter a value from ${MIN_ALLOWED_VAL} to ${MAX_ALLOWED_VAL}.`,
                max: `Value is too large. Enter a value from ${MIN_ALLOWED_VAL} to ${MAX_ALLOWED_VAL}.`,
            },
            rowStart: {
                required: "Missing value! Please enter the starting row number.",
                number: "Must be a number. Integers only (e.g., 5 or -5).",
                min: `Value is too small. Enter a value from ${MIN_ALLOWED_VAL} to ${MAX_ALLOWED_VAL}.`,
                max: `Value is too large. Enter a value from ${MIN_ALLOWED_VAL} to ${MAX_ALLOWED_VAL}.`
            },
            rowEnd: {
                required: "Missing value! Please enter the ending row number.",
                number: "Must be a number. Integers only (e.g., 5 or -5).",
                min: `Value is too small. Enter a value from ${MIN_ALLOWED_VAL} to ${MAX_ALLOWED_VAL}.`,
                max: `Value is too large. Enter a value from ${MIN_ALLOWED_VAL} to ${MAX_ALLOWED_VAL}.`,
            }
        },

        errorPlacement: function(error, element) {
            const errorContainerId = element.attr('id') + "Error";
            error.appendTo($('#' + errorContainerId));
        },

        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element).closest('.input-row').addClass('has-error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            $(element).closest('.input-row').removeClass('has-error');
        }
    });
});

function renderTable() {
    // 1. Get validated values from the input fields using jQuery selectors
    const cStart = Number($('#colStart').val());
    const cEnd = Number($('#colEnd').val());
    const rStart = Number($('#rowStart').val());
    const rEnd = Number($('#rowEnd').val());

    // 2. Create the HTML table structure using jQuery
    const $tableWrapper = $('#tableWrapper');
    $tableWrapper.empty(); 
    
    if (Math.abs(cEnd - cStart) > 200 || Math.abs(rEnd - rStart) > 200) {
         $tableWrapper.html('<p class="placeholder-text error">Table size too large to render efficiently. Keep ranges tighter.</p>');
         return;
    }
    
    const $table = $('<table>');

    // 3. Create the Header Row (Column values)
    const $headerRow = $('<tr>');
    $headerRow.append('<th class="empty-cell"></th>');

    // Loop through column values for the header
    for (let c = cStart; c <= cEnd; c++) {
        $headerRow.append(`<th>${c}</th>`);
    }
    $table.append($headerRow);


    // 4. Generate Body Rows
    for (let r = rStart; r <= rEnd; r++) {
        const $row = $('<tr>');
        $row.append(`<th>${r}</th>`);

        for (let c = cStart; c <= cEnd; c++) {
            const product = r * c;
            $row.append(`<td>${product}</td>`);
        }

        $table.append($row);
    }

    $tableWrapper.append($table);
}