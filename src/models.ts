export interface AdvertModel {
    id: string;
    seen: boolean;
    price: number;
    title: string;
    address: string;
    about: string;
    createdAt: string;
} 

export interface ResoponseModel {
    items: AdvertModel[];
    total: number;
    page: number;
    size: number;
    pages: number;
}