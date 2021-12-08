import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';

import { app } from '../../../../app';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(`
      INSERT INTO USERS (id, name, email, password, is_admin, created_at, drivers_license)
      VALUES ('${id}', 'My admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXXX')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const authenticateResponse = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${authenticateResponse.body.token}`)
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category if a category with the given name exists', async () => {
    const authenticateResponse = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${authenticateResponse.body.token}`)
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      });

    expect(response.status).toBe(400);
  });
});
