import { User } from "../models/User";
type FileUpload = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
};
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const ProfileService = {
  async getProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      bio: user.bio,
    };
  },

  async updateProfile(userId: string, input: any) {
    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: input },
      { new: true }
    );
    return updated;
  },

  async updateAvatar(userId: string, file: FileUpload) {
    const { createReadStream, filename, mimetype } = await file;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(mimetype)) {
      throw new Error("Unsupported file type");
    }

    const uploadsDir = path.join(__dirname, "..", "..", "uploads", "avatars");
    if (!fs.existsSync(uploadsDir))
      fs.mkdirSync(uploadsDir, { recursive: true });

    const uniqueName = `${userId}-${Date.now()}-${filename}`;
    const filePath = path.join(uploadsDir, uniqueName);
    const thumbPath = path.join(uploadsDir, `thumb-${uniqueName}`);

    const stream = createReadStream();
    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(fs.createWriteStream(filePath))
        .on("finish", resolve)
        .on("error", reject);
    });

    await sharp(filePath).resize(128).toFile(thumbPath);

    const avatar = {
      url: `/uploads/avatars/${uniqueName}`,
      thumbnailUrl: `/uploads/avatars/thumb-${uniqueName}`,
      uploadedAt: new Date(),
    };

    await User.findByIdAndUpdate(userId, { avatar });

    return avatar;
  },
};
