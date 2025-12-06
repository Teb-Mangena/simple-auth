export const clerkWebhook = async (req,res) => {

  try {
    const event = req.body;

    if (event.type === "user.created") {
      const { email_addresses, first_name, id, image_url, last_name } = event.data;
      const newUser = new User({
        name: `${first_name || ""} ${last_name || ""}`,
        email: email_addresses[0]?.email_address,
        profileImage: image_url,
        clerkId: id,
      });
      await newUser.save();
    }

    if (event.type === "user.deleted") {
      await User.deleteOne({ clerkId: event.data.id });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Webhook handling failed" });
  }
}