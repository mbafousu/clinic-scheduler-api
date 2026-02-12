import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import Note from "../models/Note.js";

function futureDate(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d;
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Clearing collections...");
  await Promise.all([User.deleteMany({}), Appointment.deleteMany({}), Note.deleteMany({})]);

  console.log("👥 Creating users...");
  const staff = await User.insertMany([
    { fullName: "Dr. Amina N.", email: "amina.staff@clinic.com", role: "staff" },
    { fullName: "Nurse Carla M.", email: "carla.staff@clinic.com", role: "staff" },
    { fullName: "Dr. James K.", email: "james.staff@clinic.com", role: "staff" },
    { fullName: "Nurse Lea P.", email: "lea.staff@clinic.com", role: "staff" },
    { fullName: "Dr. Omar S.", email: "omar.staff@clinic.com", role: "staff" }
  ]);

  const patients = await User.insertMany([
    { fullName: "John Doe", email: "john.patient@clinic.com", role: "patient" },
    { fullName: "Mary Smith", email: "mary.patient@clinic.com", role: "patient" },
    { fullName: "Kevin Brown", email: "kevin.patient@clinic.com", role: "patient" },
    { fullName: "Rita Young", email: "rita.patient@clinic.com", role: "patient" },
    { fullName: "Sam Lee", email: "sam.patient@clinic.com", role: "patient" },
    { fullName: "Nina Park", email: "nina.patient@clinic.com", role: "patient" },
    { fullName: "Paul Green", email: "paul.patient@clinic.com", role: "patient" },
    { fullName: "Diana Cruz", email: "diana.patient@clinic.com", role: "patient" },
    { fullName: "Chris White", email: "chris.patient@clinic.com", role: "patient" },
    { fullName: "Tina Black", email: "tina.patient@clinic.com", role: "patient" }
  ]);

  console.log("Creating appointments...");
  const appts = [];
  for (let i = 0; i < 12; i++) {
    appts.push({
      patient: patients[i % patients.length]._id,
      staff: staff[i % staff.length]._id,
      startTime: futureDate(i + 1),
      reason: ["Follow-up", "Vitals check", "Medication review", "New patient intake"][i % 4],
      status: "scheduled"
    });
  }
  const createdAppts = await Appointment.insertMany(appts);

  console.log("Creating notes...");
  const notes = [];
  for (let i = 0; i < 15; i++) {
    notes.push({
      appointment: createdAppts[i % createdAppts.length]._id,
      author: staff[i % staff.length]._id,
      text: `Clinical note #${i + 1}: patient advised on next steps and care plan.`
    });
  }
  await Note.insertMany(notes);

  console.log("Seed complete!");
  await mongoose.disconnect();
}

run().catch(async (e) => {
  console.error("Seed failed:", e);
  await mongoose.disconnect();
  process.exit(1);
});
