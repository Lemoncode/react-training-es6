export class Training {
  id: number;
  name: string;
  url: string;
  startDate: number;
  endDate: number;
  isActive: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.url = '';
    this.startDate = 0;
    this.endDate = 0;
    this.isActive = false;
  }
}
