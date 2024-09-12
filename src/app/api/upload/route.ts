import { randomBytes } from "crypto";

import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
//import { v4 as uuidv4 } from "uuid";

import { ENV } from "@/constants/env";

export async function POST(request: Request) {
  const { contentType } = await request.json();

  const bucketName = ENV.awsBucketName as string;

  // uuid 함수 호출로 고유 파일명 생성
  //const uniqueFilename = `${uuidv4()}`;
  const uniqueFilename = randomBytes(16).toString("hex"); // 16바이트의 랜덤 값을 hex로 변환
  try {
    const client = new S3Client({ region: ENV.awsRegion });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: bucketName,
      Key: uniqueFilename, // 고유한 파일 이름 사용
      Conditions: [
        ["content-length-range", 0, 10485760], // 파일 크기 제한: 0 ~ 10MB
        ["starts-with", "$Content-Type", contentType], // 파일 타입 조건 추가
      ],
      Fields: {
        acl: "public-read", // 공개 읽기 권한 설정
        "Content-Type": contentType, // 파일의 Content-Type 설정
      },
      Expires: 600, // URL 만료 시간 설정 (초 단위, 600초 = 10분)
    });
    return Response.json({ url, uniqueFilename, fields }); // 성공 시 presigned URL 및 필드 반환
  } catch (err) {
    console.log("presigned URL 생성 중 오류 발생:", err);
    return Response.json({ error: "presigned URL 생성 중 오류 발생" });
  }
}
