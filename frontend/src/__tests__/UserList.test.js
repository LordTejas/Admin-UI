import React from "react";
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "../App";
import config from "../config.json";

/** User Event Handler object */
const User = userEvent;

/**
 * Mocks the API methods to give mock data as response
 */
const mock = new MockAdapter(axios);

const usersResponse = [
  {
    id: "1",
    name: "Aaron Miles",
    email: "aaron@mailinator.com",
    role: "member",
  },
  {
    id: "2",
    name: "Aishwarya Naik",
    email: "aishwarya@mailinator.com",
    role: "member",
  },
  {
    id: "3",
    name: "Arvind Kumar",
    email: "arvind@mailinator.com",
    role: "admin",
  },
  {
    id: "4",
    name: "Caterina Binotto",
    email: "caterina@mailinator.com",
    role: "member",
  },
  {
    id: "5",
    name: "Chetan Kumar",
    email: "chetan@mailinator.com",
    role: "member",
  },
  {
    id: "6",
    name: "Jim McClain",
    email: "jim@mailinator.com",
    role: "member",
  },
  {
    id: "7",
    name: "Mahaveer Singh",
    email: "mahaveer@mailinator.com",
    role: "member",
  },
  {
    id: "8",
    name: "Rahul Jain",
    email: "rahul@mailinator.com",
    role: "admin",
  },
  {
    id: "9",
    name: "Rizan Khan",
    email: "rizan@mailinator.com",
    role: "member",
  },
  {
    id: "10",
    name: "Sarah Potter",
    email: "sarah@mailinator.com",
    role: "admin",
  },
  {
    id: "11",
    name: "Keshav Muddaiah",
    email: "keshav@mailinator.com",
    role: "member",
  },
  {
    id: "12",
    name: "Nita Ramesh",
    email: "nita@mailinator.com",
    role: "member",
  },
  {
    id: "13",
    name: "Julia Hunstman",
    email: "julia@mailinator.com",
    role: "member",
  },
  {
    id: "14",
    name: "Juan Alonso",
    email: "juan@mailinator.com",
    role: "admin",
  },
  {
    id: "15",
    name: "Gabriel Montoya",
    email: "gabriel@mailinator.com",
    role: "admin",
  },
];

/** GET - users from the endPoint */
mock.onGet(`${config.endpoint}`).reply(200, usersResponse);

jest.useFakeTimers();

describe("admin-ui tests", () => {
  beforeEach(async () => {
    // https://github.com/clarkbw/jest-localstorage-mock/issues/125
    jest.clearAllMocks();

    await act(async () => {
      render(<App />);
    });
  });

  /**
   * SearchBar Functionality Tests
   */
  test("1. Search Bar: should have a search bar", async () => {
    const searchInput = screen.getAllByPlaceholderText(/search/i)[0];
    expect(searchInput).toBeInTheDocument();
  });

  test("2. Search Bar: Should be able to accept text", async () => {
    const searchInput = screen.getByPlaceholderText(/search/i);

    // jest.runAllTimers();
    // await jest.setTimeout(5000);

    const searchText = "Tejas";
    await act(() => {
      User.type(searchInput, searchText);
    });

    // console.log("Search: ", searchInput.getAttribute('value'));

    expect(searchInput.getAttribute("value")).toEqual(searchText);
  });

  test("3. Table View: Check if the Headers are loaded", async () => {
    // const headers = ["Name", "Email", "Role", "Actions"];
    const foundElements = screen.getAllByRole("columnheader");

    // Check if all 5 the headers are properly loaded
    expect(foundElements.length).toEqual(5);
  });

  test("4. Table View: Table Body is rendered", async () => {
    let container;
    await act(async () => {
      ({ container } = render(<App />));
    });

    // Find if all selectable table rows are found
    const tableBody = container.querySelector("tbody");
    expect(tableBody).toBeInTheDocument();
  });

  test("5. Table View: Table Rows are loaded", async () => {
    // Wait for 5 seconds to render fetched data
    jest.runAllTimers();

    await jest.setTimeout(5000);

    // Find if all selectable table rows are found
    const tableRows = screen.getAllByText("member");
    // console.log("Table Rows Found", tableRows.length);

    expect(tableRows.length > 5).toBeTruthy();
  });

  test("6. Table Actions Area: Check Delete Selected Button Exists", async () => {
    const deleteButton = screen.getByText(/delete/i);
    expect(deleteButton).toBeInTheDocument();
  });

  test("7. Table Actions Area: Check Pagination Control is available", async () => {
    const deleteButton = screen.getByLabelText(/navigation/i);
    expect(deleteButton).toBeInTheDocument();
  });

  test("8. Table Actions Area: Check Row Limit Select is available", async () => {
    const RowLimitSelect = screen.getByLabelText(/row limit/i);
    expect(RowLimitSelect).toBeInTheDocument();
  });
});

/**
 * Better Create a seperate module to test the functionalities of each feature!
 */
