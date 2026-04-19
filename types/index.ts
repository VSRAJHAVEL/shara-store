export interface Product {
    id: number;
    name: string;
    price: string;
    specs: string;
    image?: string;
    badge: string | null;
    badgeColor: string;
    brand: string;
    category: string;
    initial: string;
    description?: string;
}

export interface Category {
    id: string;
    name: string;
    icon: any;
    size: "small" | "medium" | "large";
    gradient: string;
    description?: string;
}

export interface Service {
    title: string;
    description: string;
    features: string[];
    icon: any;
    color: string;
}

export interface CartItem extends Product {
    quantity: number;
}
