/**
 * Decodes an arbitrary event based on its version.
 * @param {Object} block_event - The event to be decoded.
 * @param {Object} gen_type_event - An object containing different versions and their respective methods to check and decode events.
 * @returns {Object|null} The decoded event object if successful, or null if no appropriate decoder was found.
 */
export function decodeEvent(block_event_or_call: any, gen_type_event: any) {
    let decoded = null;  // Initialize decoded as null to handle cases where no decoder is applicable
    console.log('Decoding event...', block_event_or_call)
    console.log('Decoding event...', gen_type_event)

    if (gen_type_event.v9430 && gen_type_event.v9430.is(block_event_or_call)) {
        // Check if the event transferred is of the v9430 type
        console.log('Transferred event is of type v9430')
        //console.log('Decoding event...', block_event_or_call);
        decoded = gen_type_event.v9430.decode(block_event_or_call);
    } else if (gen_type_event.v1005000 && gen_type_event.v1005000.is(block_event_or_call)) {
        // Check if the event transferred is of the v1005000 type
        console.log('Transferred event is of type v1005000');
        decoded = gen_type_event.v1005000.decode(block_event_or_call);
    } else if (gen_type_event.v1005001 && gen_type_event.v1005001.is(block_event_or_call)) {
        // Check if the event transferred is of the v1005001 type
        console.log('Transferred event is of type v1005001');
        decoded = gen_type_event.v1005001.decode(block_event_or_call);
    } else if (gen_type_event.v1007000 && gen_type_event.v1007000.is(block_event_or_call)) {
        // Check if the event transferred is of the v1007000 type
        console.log('Transferred event is of type v1007000');
        decoded = gen_type_event.v1007000.decode(block_event_or_call);
    } else if (gen_type_event.v1009000 && gen_type_event.v1009000.is(block_event_or_call)) {
        // Check if the event transferred is of the v1009000 type
        console.log('Transferred event is of type v1009000');
        decoded = gen_type_event.v1009000.decode(block_event_or_call);
    } else if (gen_type_event.v1010000 && gen_type_event.v1010000.is(block_event_or_call)) {
        // Check if the event transferred is of the v1010000 type
        console.log('Transferred event is of type v1010000');
        decoded = gen_type_event.v1010000.decode(block_event_or_call);
    } else if (gen_type_event.v1011000 && gen_type_event.v1011000.is(block_event_or_call)) {
        // Check if the event transferred is of the v1011000 type
        console.log('Transferred event is of type v1011000');
        decoded = gen_type_event.v1011000.decode(block_event_or_call);
    } else if (gen_type_event.v1002000 && gen_type_event.v1002000.is(block_event_or_call)) {
        // Check if the event transferred is of the v1002000 type
        console.log('Transferred event is of type v1002000');
        decoded = gen_type_event.v1002000.decode(block_event_or_call);
    } else if (gen_type_event.v1002004 && gen_type_event.v1002004.is(block_event_or_call)) {
        // Check if the event transferred is of the v1002004 type
        console.log('Transferred event is of type v1002004');
        decoded = gen_type_event.v1002004.decode(block_event_or_call);
    } else if (gen_type_event.v1003000 && gen_type_event.v1003000.is(block_event_or_call)) {
        // Check if the event transferred is of the v1003000 type
        console.log('Transferred event is of type v1003000');
        decoded = gen_type_event.v1003000.decode(block_event_or_call);
    } else {
        console.log('Transferred event is of unknown type');
    }

    // Return the decoded event or null if none of the conditions matched
    return decoded;
}