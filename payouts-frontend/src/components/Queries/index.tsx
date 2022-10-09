export const GET_PAYOUTS_LISTS = `
query {
    payoutsRecords(first: 5) {
        id
        Sender
        Receiver
        Date
    }
}
`;

export const GET_PAYERS_LISTS = `
query {
    payers {
        id
        Deleted
        Address 
    }
}
`;
