export const GET_PAYOUTS_LISTS = `
query {
    payoutsRecords{
        id
        Sender
        Receiver
        Date
        Rewards
        TokenAddress
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
