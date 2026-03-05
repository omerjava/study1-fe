export interface Member {
    id?: number;
    name: string;
    gsm: string;
    address: string;
    postcode: number;
    city: string;
    state?: string;
    country: string;
    membershipStartDate: string; // ISO string
    membershipExpiryDate: string; // ISO string
    profilePhotoUrl?: string;
    subscriptionFeePaid: boolean;
}