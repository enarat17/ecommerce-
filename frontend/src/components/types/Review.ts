export interface Review {
    review: string;
    rating: number;
    user:{
        id:string;
        name:string;
    };
}