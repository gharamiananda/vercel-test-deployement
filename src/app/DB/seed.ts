import { UserRole } from "../modules/user/user.interface";
import User from "../modules/user/user.model";

const adminUser = {
  email: "anandagharami.am@gmail.com",
  password: "8420@nandA",
  name: "Admin",
  roles: [UserRole.SUPERADMIN],
  clientInfo: {
    device: "pc",
    browser: "Unknown",
    ipAddress: "127.0.0.1",
    pcName: "localhost",
    os: "Unknown",
    userAgent: "Seed Script",
  },
};

const seedAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({
      roles: { $in: [UserRole.SUPERADMIN] },
    });

    if (!isAdminExist) {
      await User.create(adminUser);
      console.log("✅ SuperAdmin user created successfully.");
    } else {
      console.log("ℹ️ SuperAdmin user already exists.");
    }
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
  }
};

export default seedAdmin;
