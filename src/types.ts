export interface ExpressResult {
  body: {
    _id?: string;
    note?: string;
    date?: string;
    timestamp?: string;
    edits?: object;
    isEdited?: boolean;
    result?: object | null;
  };
  statusCode: number;
  text: string;
}
