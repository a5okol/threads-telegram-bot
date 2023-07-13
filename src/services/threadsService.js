import { ThreadsAPI } from "threads-api";

const DEVICE_ID = `android-${(Math.random() * 1e24).toString(36)}`;

export const threadsAPI = new ThreadsAPI({
  username: process.env.THREADS_USERNAME,
  password: process.env.THREADS_PASSWORD,
  DEVICE_ID,
});
