import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpires: Date.now() + 3600000
            }, { new: true, runValidators: true });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                resetPasswordExpiry: Date.now() + 3600000
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f12fce4b377ac6",
      pass: "9a73ca6b7cefde"
    }
  });

        const mailOptions = {
            from: 'princedayma230@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" :
             "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to
             ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
             or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/veriryemail?token=${hashedToken}
             </p>`
        };

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}