import { NextRequest, NextResponse } from "next/server";

import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return new NextResponse(JSON.stringify({ message: "이메일을 입력해주세요." }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // 인증번호 생성
  const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();

  // Nodemailer transporter 설정
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "이메일 인증 코드",
    text: `인증번호는 ${verificationCode}입니다.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new NextResponse(
      JSON.stringify({
        message: "인증번호가 이메일로 전송되었습니다.",
        code: verificationCode,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return new NextResponse(JSON.stringify({ message: "이메일 전송에 실패했습니다." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
