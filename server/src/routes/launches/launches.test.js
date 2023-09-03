const request = require('supertest');

const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect(200)
            .expect('Content-Type', /json/)

    })

})

describe('Test POST /launch', () => {

    const completeLaunchData = {
        mission: 'Kepler Exploratoion X',
        rocket: 'Explore IS1',
        target: 'Kepler-442 b',
        launchDate: 'December 27, 2030',
    }
    const launchDataWithoutDate = {
        mission: 'Kepler Exploratoion X',
        rocket: 'Explore IS1',
        target: 'Kepler-442 b',
    }

    const IncorrectDateLaunchData = {
        mission: 'Kepler Exploratoion X',
        rocket: 'Explore IS1',
        target: 'Kepler-442 b',
        launchDate: 'Zosajkjsal;sa',
    }



    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect(201)
            .expect('Content-Type', /json/);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(response.body).toMatchObject(launchDataWithoutDate);
        expect(requestDate).toBe(responseDate)


    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect(400)
            .expect('Content-Type', /json/);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
        });
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(IncorrectDateLaunchData)
            .expect(400)
            .expect('Content-Type', /json/);

        expect(response.body).toStrictEqual({
            error: 'Invalid Launch Date'
        })
    })
})


describe('Test Delete /launch:id', () => {
    test('It should respond with 200 success', async () => {
        const id = 100;
        const response = await request(app)
            .delete(`/launches/${id}`)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toStrictEqual({
            flightNumber: 100,
            mission: 'Kepler Exploratoion X',
            rocket: 'Explore IS1',
            launchDate: "2030-12-26T19:00:00.000Z",
            target: 'Kepler-442 b',
            customer: ['ZTM', 'NASA'],
            upcoming: false,
            success: false,
        });


    })
})

