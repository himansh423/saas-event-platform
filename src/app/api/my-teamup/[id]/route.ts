import connectToDatabase from "@/library/db";
import User from "@/library/Modal/User";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id: userId } = params;
    await connectToDatabase();

    const user = await User.findById(userId).populate({
      path: "createdTeamUp",
      populate: {
        path: "appliedBy",
        model: "User",
        select: "firstName lastName email",
      },
      select:
        "hackName email createdBy dateStart dateEnd location mobileNumber appliedBy eventOrHackathonUrl",
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
