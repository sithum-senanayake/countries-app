import {
  getAllCountries,
  getCountryByName,
  getCountryByCode,
  getCountriesByRegion,
  getCountriesByLanguage,
} from "../../src/services/api";

describe("Country Service Integration Tests", () => {
  jest.setTimeout(10000);

  test("should fetch all countries", async () => {
    const countries = await getAllCountries();
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.length).toBeGreaterThan(0);
  });

  test("should fetch country by name", async () => {
    const country = await getCountryByName("France");
    expect(country[0].name.common).toBe("France");
  });

  test("should fetch country by code", async () => {
    const country = await getCountryByCode("US");
    expect(country[0].cca2).toBe("US");
    expect(country[0].name.common).toBe("United States");
  });

  test("should fetch countries by region", async () => {
    const countries = await getCountriesByRegion("Europe");
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.some((c) => c.region === "Europe")).toBe(true);
  });

  test("should fetch countries by language", async () => {
    const countries = await getCountriesByLanguage("spanish");
    expect(Array.isArray(countries)).toBe(true);
    expect(
      countries.some(
        (c) => c.languages && Object.values(c.languages).includes("Spanish")
      )
    ).toBe(true);
  });
});
