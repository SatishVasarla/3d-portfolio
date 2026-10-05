import { z } from "zod";

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(10, "Message is too short!"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = Email.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid payload" }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: "This app uses EmailJS from the client side. The server route is intentionally disabled.",
      data: parsed.data,
    });
  } catch (error) {
    return Response.json({ error: "Invalid request body." }, { status: 500 });
  }
}
