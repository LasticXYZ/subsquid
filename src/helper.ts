interface GenTypeEvent<T> {
    is: (event: any) => boolean;
    decode: (event: any) => T;
}

interface EventType {
    [key: string]: GenTypeEvent<any> | string;
}

/**
 * Decodes an arbitrary event based on its version.
 * @param {any} block_event_or_call - The event to be decoded.
 * @param {EventType} gen_type_event - An object containing different versions and their respective methods to check and decode events.
 * @returns {T | null} The decoded event object if successful, or null if no appropriate decoder was found.
 */
export function decodeEvent<T>(block_event_or_call: any, gen_type_event: EventType): T | null {
    const versions = Object.keys(gen_type_event).filter(key => key !== 'name');

    console.log('Decoding event...', block_event_or_call);
    console.log('Decoding event...', gen_type_event);

    for (const version of versions) {
        const eventType = gen_type_event[version] as GenTypeEvent<T>;
        if (eventType && eventType.is(block_event_or_call)) {
            console.log(`Transferred event is of type ${version}`);
            return eventType.decode(block_event_or_call);
        }
    }

    console.log('Transferred event is of unknown type');
    return null;
}






// export function decodeEvent(block_event_or_call: any, gen_type_event: any) {
//     let decoded = null;  // Initialize decoded as null to handle cases where no decoder is applicable
//     // console.log('Decoding event...', block_event_or_call)
//     // console.log('Decoding event...', gen_type_event)

//     if (gen_type_event.v9430 && gen_type_event.v9430.is(block_event_or_call)) {
//         // Check if the event transferred is of the v9430 type
//         console.log('Transferred event is of type v9430')
//         //console.log('Decoding event...', block_event_or_call);
//         decoded = gen_type_event.v9430.decode(block_event_or_call);
//     } else if (gen_type_event.v1005000 && gen_type_event.v1005000.is(block_event_or_call)) {
//         // Check if the event transferred is of the v1005000 type
//         console.log('Transferred event is of type v1005000');
//         decoded = gen_type_event.v1005000.decode(block_event_or_call);
//     } else if (gen_type_event.v1005001 && gen_type_event.v1005001.is(block_event_or_call)) {
//         // Check if the event transferred is of the v1005001 type
//         console.log('Transferred event is of type v1005001');
//         decoded = gen_type_event.v1005001.decode(block_event_or_call);
//     } else if (gen_type_event.v1007000 && gen_type_event.v1007000.is(block_event_or_call)) {
//         // Check if the event transferred is of the v1007000 type
//         console.log('Transferred event is of type v1007000');
//         decoded = gen_type_event.v1007000.decode(block_event_or_call);
//     } else if (gen_type_event.v1009000 && gen_type_event.v1009000.is(block_event_or_call)) {
//         // Check if the event transferred is of the v1009000 type
//         console.log('Transferred event is of type v1009000');
//         decoded = gen_type_event.v1009000.decode(block_event_or_call);
//     } else if (gen_type_event.v1010000 && gen_type_event.v1010000.is(block_event_or_call)) {
//         // Check if the event transferred is of the v1010000 type
//         console.log('Transferred event is of type v1010000');
//         decoded = gen_type_event.v1010000.decode(block_event_or_call);
//     } else if (gen_type_event.v1011000 && gen_type_event.v1011000.is(block_event_or_call)) {
//         // Check if the event transferred is of the v1011000 type
//         console.log('Transferred event is of type v1011000');
//         decoded = gen_type_event.v1011000.decode(block_event_or_call);
//     } else if (gen_type_event.v1012000 && gen_type_event.v1012000.is(block_event_or_call)) {
//         // Check if the event transferred is of the v1012000 type
//         console.log('Transferred event is of type v1012000');
//         decoded = gen_type_event.v1012000.decode(block_event_or_call);
//     } else if (gen_type_event.v1002000 && gen_type_event.v1002000.is(block_event_or_call)) {
//         // Check if the event transferred is of the v1002000 type
//         console.log('Transferred event is of type v1002000');
//         decoded = gen_type_event.v1002000.decode(block_event_or_call);
//     } else if (gen_type_event.v1002004 && gen_type_event.v1002004.is(block_event_or_call)) {
//         // Check if the event transferred is of the v1002004 type
//         console.log('Transferred event is of type v1002004');
//         decoded = gen_type_event.v1002004.decode(block_event_or_call);
//     } else {
//         console.log('Transferred event is of unknown type');
//     }

//     // Return the decoded event or null if none of the conditions matched
//     return decoded;
// }
