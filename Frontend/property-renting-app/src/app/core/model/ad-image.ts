export class AdImage {
  public name: string;
  public type: string;
  public picByte: any;

  constructor(name: string, type: string, picByte: any) {
    this.name = name;
    this.type = type;
    this.picByte = picByte;
  }
}
