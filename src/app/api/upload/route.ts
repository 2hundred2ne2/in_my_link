import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();

  const bucketName = process.env.AWS_BUCKET_NAME as string;

  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: bucketName,
      Key: uuidv4(),
      Conditions: [
        ["content-length-range", 0, 10485760], // 최대 10MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600,
    });

    return Response.json({ url, fields });
  } catch (error) {
    return Response.json({ error: "presigned URL 생성 중 오류 발생" });
  }
}
