import User from "../models/User.js";
export const sendMail = async (req, res) => {
  const senderId = req.user.userID;
  const mail = req.body;
  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ email: mail.to });

    if (!sender) {
      return res.status(404).json({ msg: "Sender Not Found!" });
    }
    if (!sender) {
      return res.status(404).json({ msg: "Receiver Not Found!" });
    }
    sender.sentEmails.push(mail);
    await sender.save();
    receiver.receivedEmails.push(mail);
    await receiver.save();

    res.status(200).json({ message: "Mail sent successfully" });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(400).json({ error: "Somthing went wrong!" });
  }
};
export const getSentMails = async (req, res) => {
  const userId = req.user.userID;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "user not found!" });
    }
    res.status(200).json({ mails: user.sentEmails });
  } catch (error) {res.status(400).json({ error: "Somthing went wrong!" });}
};
export const getReceivedtMails = async (req, res) => {
  const userId = req.user.userID;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "user not found!" });
    }
    res.status(200).json({ mails: user.receivedEmails });
  } catch (error) {res.status(400).json({ error: "Somthing went wrong!" });}
};
