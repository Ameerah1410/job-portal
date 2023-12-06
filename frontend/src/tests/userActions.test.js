const configureMockStore = require("redux-mock-store");
const thunk = require("redux-thunk");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const {
  allUserAction,
  ALL_USER_LOAD_REQUEST,
  ALL_USER_LOAD_SUCCESS,
  ALL_USER_LOAD_FAIL,
} = require("./userActions");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("userActions", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  test("dispatches ALL_USER_LOAD_SUCCESS when fetching users is successful", async () => {
    const expectedData = [{ id: 1, name: "User 1" }];

    mockAxios.onGet("/api/allusers").reply(200, expectedData);

    const store = mockStore({});
    await store.dispatch(allUserAction());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(ALL_USER_LOAD_REQUEST);
    expect(actions[1].type).toEqual(ALL_USER_LOAD_SUCCESS);
    expect(actions[1].payload).toEqual(expectedData);
  });

  test("dispatches ALL_USER_LOAD_FAIL when fetching users fails", async () => {
    const errorMessage = "Failed to fetch users";

    mockAxios.onGet("/api/allusers").reply(500, { error: errorMessage });

    const store = mockStore({});
    await store.dispatch(allUserAction());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(ALL_USER_LOAD_REQUEST);
    expect(actions[1].type).toEqual(ALL_USER_LOAD_FAIL);
    expect(actions[1].payload).toEqual(errorMessage);
  });
});
