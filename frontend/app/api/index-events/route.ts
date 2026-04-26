import { NextResponse } from "next/server";

const HORIZON_URL = "https://horizon-testnet.stellar.org";
const DEFAULT_INDEX_ACCOUNT =
  process.env.NEXURA_INDEX_ACCOUNT ||
  "GDHWXGMJVAYCHUWDATDMANHES3IFQOI2I5DNI7I43DZILSKSECBMQFOH";

type HorizonOperation = {
  id: string;
  type: string;
  source_account: string;
  amount?: string;
  transaction_hash?: string;
  created_at: string;
  transaction_successful?: boolean;
};

type HorizonResponse = {
  _embedded?: {
    records?: HorizonOperation[];
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const account = searchParams.get("account") || DEFAULT_INDEX_ACCOUNT;

  const events = await fetch(
    `${HORIZON_URL}/accounts/${account}/operations?order=desc&limit=25`,
    { cache: "no-store" },
  );

  if (!events.ok) {
    return NextResponse.json(
      {
        error: "Failed to fetch events from Horizon",
        status: events.status,
      },
      { status: events.status },
    );
  }

  const payload = (await events.json()) as HorizonResponse;
  const records = Array.isArray(payload?._embedded?.records)
    ? payload._embedded.records
    : [];

  const indexedEvents = records.map((record) => ({
    id: record.id,
    eventType: record.type,
    source: record.source_account,
    amount: record.amount ?? null,
    transactionHash: record.transaction_hash ?? null,
    createdAt: record.created_at,
    successful: record.transaction_successful ?? true,
  }));

  return NextResponse.json({
    account,
    count: indexedEvents.length,
    events: indexedEvents,
  });
}
