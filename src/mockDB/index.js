import { createServer, Model } from 'miragejs';
import { DateTime } from 'luxon';

const now = DateTime.now();

const mockServer = createServer({
  models: {
    appointment: Model,
    doctor: Model,
    patient: Model,
  },
  seeds(server) {
    /**
     * Patients
     */
    const bulbasaur = server.create('patient', {
      name: 'Bulbasaur',
      photoURL: '/bulbasaur.png',
      type: 'grass'
    });
    const charmander = server.create('patient', {
      name: 'Charmander',
      photoURL: '/Charmander.png',
      type: 'fire'
    });
    const squirtle = server.create('patient', {
      name: 'Squirtle',
      photoURL: '/squirtle.png',
      type: 'water'
    });
    const bellsprout = server.create('patient', {
      name: 'Bellsprout',
      photoURL: '/Bellsprout.png',
      type: 'grass'
    });

    /**
     * Doctors
     */
    const oddish = server.create('doctor', {
      name: 'Oddish',
      photoURL: '/oddish.png',
      type: 'grass'
    });
    const growlithe = server.create('doctor', {
      name: 'Growlithe',
      photoURL: '/growlithe.png',
      type: 'fire'
    });
    const staryu = server.create('doctor', {
      name: 'Staryu',
      photoURL: '/staryu.png',
      type: 'water'
    });

    /**
     * Appointments
     */
    // NEW
    server.create('appointment', {
      requestedDate: now.plus({ days: 4 }).toISO(),
      requestReason: 'Regular checkup',
      patientID: bulbasaur.id,
      doctorID: undefined,
      status: 'new',
      statusReason: undefined,
    });
    server.create('appointment', {
      requestedDate: now.plus({ days: 2 }).toISO(),
      requestReason: 'Follow up on rare candy stomach pump',
      patientID: charmander.id,
      doctorID: undefined,
      status: 'new',
      statusReason: undefined,
    });
    server.create('appointment', {
      requestedDate: now.plus({ days: 6 }).toISO(),
      requestReason: 'I have a weird rash after fighting a caterpie, can you figure out why?',
      patientID: squirtle.id,
      doctorID: undefined,
      status: 'new',
      statusReason: undefined,
    });
    server.create('appointment', {
      requestedDate: now.plus({ days: 5 }).toISO(),
      requestReason: 'Worried about curling leaves',
      patientID: bellsprout.id,
      doctorID: undefined,
      status: 'new',
      statusReason: undefined,
    });
    // Confirmed
    server.create('appointment', {
      requestedDate: now.plus({ days: 2 }).toISO(),
      requestReason: 'Flower pod pain',
      patientID: bulbasaur.id,
      doctorID: staryu.id,
      status: 'confirmed',
      statusReason: undefined,
    });
    // Completed
    server.create('appointment', {
      requestedDate: now.minus({ days: 1 }).toISO(),
      requestReason: 'Too much sneezing!',
      patientID: squirtle.id,
      doctorID: growlithe.id,
      status: 'completed',
      statusReason: 'Grass allergies, prescribed anti-histamines',
    });
    // Cancelled
    server.create('appointment', {
      requestedDate: now.minus({ days: 10 }).toISO(),
      requestReason: 'Chills at night, worried about tail flame',
      patientID: charmander.id,
      doctorID: oddish.id,
      status: 'cancelled',
      statusReason: 'Met with another doctor via tele-medicine',
    });
  },
  routes() {
    this.namespace = 'api-v1';

    /**
     * Appointments
     */
    this.get('/appointments', (schema) => schema.appointments.all());

    this.post('/appointments/:id/confirm', (schema, request) => {
      const body = JSON.parse(request.requestBody);

      if (!body.doctorID) {
        throw new Error('Missing required string argument "doctorID"');
      }

      const doctor = schema.doctors.find(body.doctorID);

      if (!doctor) {
        throw new Error(`Unrecognized Doctor ID ${body.doctorID}`);
      }

      const { id } = request.params;
      const appt = schema.appointments.find(id);

      appt.update({
        status: 'confirmed',
        doctorID: doctor.id,
      })

      return appt;
    });

    this.delete('/appointments/:id', (schema, request) => {
      const body = JSON.parse(request.requestBody);

      if (!body.reason) {
        throw new Error('Missing required string argument "reason"');
      }

      const { id } = request.params;
      const appt = schema.appointments.find(id);

      appt.update({
        status: 'cancelled',
        statusReason: body.reason,
      });

      return appt;
    });

    /**
     * Doctors (Read-Only)
     */
    this.get('/doctors', (schema) => schema.doctors.all());

    /**
     * Patients (Read-Only)
     */
    this.get('/patients', (schema) => schema.patients.all());
  },
});

export default mockServer;
