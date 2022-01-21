export interface Banner {
  id: number;
  title: string;
  desc: string;
  image: string;
  href: string;
  type: string;
  order: number;
  active: {
    start: string;
    end: string;
  };
  activeCountdown: false;
  category?: string;
}
