import type { Request, Response } from "express";

export function getMockRequest() {
  return {
    params: {},
    query: {},
    body: {},
    session: {customer_id:{}},
  } as Request;
}

export function getMockResponse() {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  } as any as Response;
  return res;
}