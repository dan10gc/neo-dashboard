import { http, HttpResponse } from "msw";
import { mockNeoResponse } from "../fixtures/neoResponse";

export const handlers = [
  http.get("https://api.nasa.gov/neo/rest/v1/feed", () => {
    return HttpResponse.json(mockNeoResponse);
  }),
];
