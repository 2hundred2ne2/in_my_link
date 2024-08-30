import { randomBytes } from "crypto";

import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

// In-memory store for demo purposes. Use a persistent store for production.
const verificationCodes: { [key: string]: string } = {};

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "이메일을 제공해 주세요" }, { status: 400 });
  }

  const verificationCode = randomBytes(3).toString("hex"); // 6자리 인증번호 생성
  verificationCodes[email] = verificationCode; // 인증번호 저장

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "인증번호",
    text: `인증번호는 ${verificationCode}입니다.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "인증번호가 이메일로 발송되었습니다." }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "이메일 전송 중 오류가 발생했습니다" }, { status: 500 });
  }
}
