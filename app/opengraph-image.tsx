import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

export const alt = `${profile.name} - ${profile.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "#F6F3EE",
          color: "#1E211F",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "80px",
          width: "100%",
        }}
      >
        <div style={{ color: "#FF4D1F", fontSize: 28, marginBottom: 24 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.05 }}>{profile.title}</div>
      </div>
    ),
    {
      ...size,
    },
  );
}
