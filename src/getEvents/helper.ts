/**
 * Decodes an arbitrary event based on its version.
 * @param {Object} block_event - The event to be decoded.
 * @param {Object} gen_type_event - An object containing different versions and their respective methods to check and decode events.
 * @returns {Object|null} The decoded event object if successful, or null if no appropriate decoder was found.
 */
export function decodeEvent(block_event: any, gen_type_event: any) {
    let decoded = null;  // Initialize decoded as null to handle cases where no decoder is applicable

    if (gen_type_event.v9430.is(block_event)) {
        // Check if the event transferred is of the v9430 type
        console.log('Transferred event is of type v9430')
        decoded = gen_type_event.v9430.decode(block_event);
    } else if (gen_type_event.v1011000.is(block_event)) {
        // Check if the event transferred is of the v1011000 type
        console.log('Transferred event is of type v1011000');
        decoded = gen_type_event.v1011000.decode(block_event);
    }

    // Return the decoded event or null if none of the conditions matched
    return decoded;
}
