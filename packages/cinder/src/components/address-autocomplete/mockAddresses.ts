import type { CDAddressSuggestion } from "./types";

export const MOCK_GLOBAL_ADDRESSES: CDAddressSuggestion[] = [
  {
    id: "addr-1",
    mainText: "100 California Street",
    secondaryText: "Financial District, San Francisco, CA 94111, USA",
    details: {
      formattedAddress: "100 California St, San Francisco, CA 94111, USA",
      streetNumber: "100",
      streetName: "California Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94111",
      country: "United States",
      lat: 37.7933,
      lng: -122.3986,
    },
  },
  {
    id: "addr-2",
    mainText: "1 Hacker Way",
    secondaryText: "Menlo Park, CA 94025, USA",
    details: {
      formattedAddress: "1 Hacker Way, Menlo Park, CA 94025, USA",
      streetNumber: "1",
      streetName: "Hacker Way",
      city: "Menlo Park",
      state: "CA",
      postalCode: "94025",
      country: "United States",
      lat: 37.4848,
      lng: -122.1484,
    },
  },
  {
    id: "addr-3",
    mainText: "350 5th Avenue",
    secondaryText: "Empire State Building, New York, NY 10118, USA",
    details: {
      formattedAddress: "350 5th Ave, New York, NY 10118, USA",
      streetNumber: "350",
      streetName: "5th Avenue",
      city: "New York",
      state: "NY",
      postalCode: "10118",
      country: "United States",
      lat: 40.7484,
      lng: -73.9857,
    },
  },
  {
    id: "addr-4",
    mainText: "1 St Pancras Square",
    secondaryText: "Kings Cross, London N1C 4AG, United Kingdom",
    details: {
      formattedAddress: "1 St Pancras Sq, London N1C 4AG, UK",
      streetNumber: "1",
      streetName: "St Pancras Square",
      city: "London",
      state: "England",
      postalCode: "N1C 4AG",
      country: "United Kingdom",
      lat: 51.5332,
      lng: -0.1257,
    },
  },
  {
    id: "addr-5",
    mainText: "Marlene-Dietrich-Platz 5",
    secondaryText: "Mitte, 10785 Berlin, Germany",
    details: {
      formattedAddress: "Marlene-Dietrich-Platz 5, 10785 Berlin, Germany",
      streetNumber: "5",
      streetName: "Marlene-Dietrich-Platz",
      city: "Berlin",
      state: "Berlin",
      postalCode: "10785",
      country: "Germany",
      lat: 52.5065,
      lng: 13.3732,
    },
  },
  {
    id: "addr-6",
    mainText: "6-10-1 Roppongi",
    secondaryText: "Roppongi Hills, Minato-ku, Tokyo 106-6108, Japan",
    details: {
      formattedAddress: "6-10-1 Roppongi, Minato City, Tokyo 106-6108, Japan",
      streetNumber: "6-10-1",
      streetName: "Roppongi",
      city: "Tokyo",
      state: "Tokyo",
      postalCode: "106-6108",
      country: "Japan",
      lat: 35.6605,
      lng: 139.7292,
    },
  },
];

export async function defaultMockAddressProvider(query: string): Promise<CDAddressSuggestion[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 180));

  if (!query || query.trim().length === 0) {
    return MOCK_GLOBAL_ADDRESSES.slice(0, 3).map((a) => ({ ...a, isRecent: true }));
  }

  const q = query.toLowerCase();
  return MOCK_GLOBAL_ADDRESSES.filter(
    (a) =>
      a.mainText.toLowerCase().includes(q) ||
      a.secondaryText.toLowerCase().includes(q) ||
      a.details.city?.toLowerCase().includes(q)
  );
}
