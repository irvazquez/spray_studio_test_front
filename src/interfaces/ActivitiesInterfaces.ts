export interface ActivityInterface {
  id: string;
  name: string;
  packages: PackageInterface[];
}

export interface PackageInterface {
  id: string;
  no_classes: number;
  price: number;
}

export interface GetOrderPriceItem {
  id: string;
  noClasses: number;
}

export interface OrderInterface {
  items: GetOrderPriceItem[];
}
