import {
  getConfiguracionesHandler,
  postConfiguracionHandler
} from "./controller";

export async function GET(request: Request) {
  return getConfiguracionesHandler(request);
}

export async function POST(request: Request) {
  return postConfiguracionHandler(request);
}