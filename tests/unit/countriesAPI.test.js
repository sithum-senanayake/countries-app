import { jest } from "@jest/globals";
import axios from "axios";
import {
  getAllCountries,
  getCountryByName,
  getCountryByCode,
  getCountriesByRegion,
  getCountriesByLanguage,
} from "../../src/services/api.js";

jest.mock("axios");

describe("Countries API Service - Unit Tests", () => {
  const mockResponseData = [
    {
      name: { common: "Test Country" },
      cca2: "TC",
      region: "Test Region",
      languages: { test: "Test Language" },
    },
  ];

  beforeEach(() => {
    axios.get.mockClear();
  });

  describe("getAllCountries", () => {
    it("should make a GET request to the correct endpoint", async () => {
      axios.get.mockResolvedValue({ data: mockResponseData });

      await getAllCountries();

      expect(axios.get).toHaveBeenCalledWith(
        "https://restcountries.com/v3.1/all"
      );
    });
  });
});
