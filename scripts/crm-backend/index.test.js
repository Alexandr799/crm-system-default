const { unlinkSync, writeFileSync } = require('fs');

const Axios = require('axios');
const { describe, it, expect, beforeAll, beforeEach, afterAll } = require('@jest/globals');
process.env.DB_FILE = require('path').resolve(process.cwd(), 'test-db.json');
process.env.PORT = 3000;
process.env.NODE_ENV = 'test';

const axios = Axios.create({
  baseURL: `http://localhost:${process.env.PORT}/api/clients/`,
  validateStatus: status => status < 500,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

let appServer;

beforeAll(async () => {
  appServer = require('./index');
  return new Promise(resolve => {
    appServer.on('listening', () => resolve());
  });
});

afterAll(() => {
  // wipe database
  unlinkSync(process.env.DB_FILE);
  return new Promise(resolve => {
    appServer.close(() => resolve());
  });
});

beforeEach(() => {
  writeFileSync(process.env.DB_FILE, '[]', { encoding: 'utf8' });
});

const client = {
  name: 'Name',
  surname: 'Surname',
  lastName: 'Last name',
  contacts: [
    {
      type: 'Phone',
      value: '+71234567890'
    }
  ]
};
const searchValue = 'abcdefGHijKLmnOPqrstuvwxyz';
const searchQuery = 'ghIJklmnopqr';

function autoData(from) {
  return ['id', 'createdAt', 'updatedAt']
    .reduce((obj, prop) => ({ ...obj, [prop]: from[prop] }), {});
}

function waitASecond() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

describe('Clients API', () => {
  it('POST /api/clients should create new user with 201 status', async () => {
    const res = await axios.post('', client);
    expect(res.status).toBe(201);
    expect(res.data).toEqual({ ...client, ...autoData(res.data) });
    expect(res.headers.location).toEqual(`/api/clients/${res.data.id}`);
  });

  it('POST /api/clients should return error descriptions with 422 status on validation error', async () => {
    const res = await axios.post('', { name: 'Srsly? Only name?'});
    expect(res.status).toBe(422);
    expect(Array.isArray(res.data.errors)).toBe(true);
    expect(res.data.errors.length).toBeGreaterThan(0);
    for (const err of res.data.errors) {
      expect(typeof err.field === 'string').toBe(true);
      expect(typeof err.message === 'string').toBe(true);
    }
  });

  it('GET /api/clients should return a list of clients with 200 status', async () => {
    const requests = [
      axios.post('', client),
      axios.post('', client),
      axios.post('', client),
    ];
    await Promise.all(requests);
    const res = await axios.get('');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBe(requests.length);
  });

  async function checkSearch(field, searchValue, searchQuery) {
    const requests = [
      axios.post('', client),
      axios.post('', { ...client, [field]: searchValue }),
      axios.post('', client),
    ];
    await Promise.all(requests);
    const res = await axios.get(`?search=${searchQuery}`);
    expect(res.status).toBe(200);
    expect(res.data.length).toBe(1);
    expect(res.data[0][field]).toEqual(searchValue);
  }

  for (const field of ['name', 'surname', 'lastName']) {
    it(
      `GET /api/clients should search by ${field} substring`,
      () => checkSearch(field, searchValue, searchQuery)
    );
  }

  it(
    `GET /api/clients should search by any contact value substring`,
    () => checkSearch(
      'contacts',
      [
        { type: 'Whatever', value: '123' },
        { type: 'Alphabet', value: searchValue }
      ],
      searchQuery
    )
  );

  it('GET /api/clients/{id} should return a client object with 200 status', async () => {
    const { data: { id } } = await axios.post('', client);
    const res = await axios.get(id);
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ ...client, ...autoData(res.data) });
  });

  it('GET /api/clients/{id} should fail with 404 status for inexistent client ID', async () => {
    const res = await axios.get('i don\'t know this guy');
    expect(res.status).toBe(404);
  });

  it('PATCH /api/clients/{id} should partially update a client with 200 status', async () => {
    const { data: original } = await axios.post('', client);

    const name = 'New name';
    const surname = 'New surname';
    const contacts = [{ type: 'New contact', value: 'Something' }];

    await waitASecond();
    const res1 = await axios.patch(original.id, { name, surname });
    expect(res1.status).toBe(200);
    expect(res1.data).toEqual({ ...client, ...autoData(res1.data), name, surname });
    expect(res1.data.createdAt === original.createdAt).toBe(true);
    expect(res1.data.updatedAt > original.updatedAt).toBe(true);

    await waitASecond();
    const res2 = await axios.patch(original.id, { contacts });
    expect(res2.status).toBe(200);
    expect(res2.data).toEqual({ ...client, ...autoData(res2.data), name, surname, contacts });
    expect(res2.data.createdAt === original.createdAt).toBe(true);
    expect(res2.data.updatedAt > res1.data.updatedAt).toBe(true);
  });

  it('PATCH /api/clients/{id} should return error descriptions with 422 status on validation error', async () => {
    const { data: { id } } = await axios.post('', client);

    const res = await axios.patch(id, { name: undefined, surname: null });
    expect(res.status).toBe(422);
    expect(Array.isArray(res.data.errors)).toBe(true);
    expect(res.data.errors.length).toBeGreaterThan(0);
    for (const err of res.data.errors) {
      expect(typeof err.field === 'string').toBe(true);
      expect(typeof err.message === 'string').toBe(true);
    }
  });

  it('PATCH /api/clients/{id} should fail with 404 status for inexistent client ID', async () => {
    const res = await axios.patch('i don\'t know this guy', { name: 'John' });
    expect(res.status).toBe(404);
  });

  it('DELETE /api/clients/{id} should delete a client with 200 status', async () => {
    const { data: { id } } = await axios.post('', client);
    const res = await axios.delete(id);
    expect(res.status).toBe(200);
    const { status } = await axios.get(id);
    expect(status).toBe(404);
  });
});
