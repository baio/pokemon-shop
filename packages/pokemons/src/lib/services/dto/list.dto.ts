export interface ListDto {
  count: number;
  next: string;
  previous: null;
  results: ResultDto[];
}

export interface ResultDto {
  name: string;
  url: string;
}
