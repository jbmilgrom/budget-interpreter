import { parse } from "path";
import { SupportedFinancialInstition } from "..";
import { safeParseInt } from "../../utils";

export type AmexCsvUnparsed = Partial<AmexCsv>;

export type AmexCsv = {
  /**
   * e.g.  '08/29/2023',
   */
  Date: string;
  /**
   * e.g.  'TRADER JOE S #049 00SHERMAN OAKS        CA',
   */
  Description: string;
  /**
   * e.g.  'HANNA ALSTER',
   */
  "Card Member": string;
  /**
   * e.g.  '-85016',
   */
  "Account #": string;
  /**
   * e.g.  '340.60',
   */
  Amount: string;
  /**
   * e.g.
   *
   * '000066032006265993700\n' +
   *    'TRADER JOE S #049 000000049\n' +
   *    'SHERMAN OAKS\n' +
   *    'CA\n' +
   *  ' 6265993700',
   */
  "Extended Details": string;
  /**
   * e.g.  'TRADER JOE S #049 00SHERMAN OAKS        CA',
   */
  "Appears On Your Statement As": string;
  /**
   * e.g.  '14119 RIVERSIDE DR',
   */
  Address: string;
  /**
   * e.g.  'SHERMAN OAKS\nCA',
   */
  "City/State": string;
  /**
   * e.g.  '91423',
   */
  "Zip Code": string;
  /**
   * e.g.  'UNITED STATES',
   */
  Country: string;
  /**
   * e.g.  "'320232420508788279'",
   */
  Reference: string;
  /**
   * e.g.  'Merchandise & Supplies-Groceries'
   */
  Category: string;
};

export type AmexPineconeMetadata = {
  source: SupportedFinancialInstition;
  date: number;
  description: string;
  cardMember: string;
  accountNumber: string;
  amount: number;
  extendedDetails: string;
  appearsOnYourStatementAs: string;
  address: string;
  cityAndState: string;
  zipCode: string;
  country: string;
  reference: string;
  category: string;
};

export function toAmexRecord(unparsed: AmexCsvUnparsed): AmexCsv {
  return {
    Date: unparsed.Date ?? "",
    Description: unparsed.Description ?? "",
    "Card Member": unparsed["Card Member"] ?? "",
    "Account #": unparsed["Account #"] ?? "",
    Amount: unparsed.Amount ?? "",
    "Extended Details": unparsed["Extended Details"] ?? "",
    "Appears On Your Statement As": unparsed["Appears On Your Statement As"] ?? "",
    Address: unparsed.Address ?? "",
    "City/State": unparsed["City/State"] ?? "",
    "Zip Code": unparsed["Zip Code"] ?? "",
    Country: unparsed.Country ?? "",
    Reference: unparsed.Reference ?? "",
    Category: unparsed.Category ?? "",
  };
}

export const toPinecone = (csv: AmexCsv): AmexPineconeMetadata => ({
  source: "Amex",
  date: new Date(csv.Date).getTime(),
  description: csv.Description,
  cardMember: csv["Card Member"],
  accountNumber: csv["Account #"],
  amount: safeParseInt(csv.Amount),
  extendedDetails: csv["Extended Details"],
  appearsOnYourStatementAs: csv["Appears On Your Statement As"],
  address: csv.Address,
  cityAndState: csv["City/State"],
  zipCode: csv["Zip Code"],
  country: csv.Country,
  reference: csv.Reference,
  category: csv.Category,
});
