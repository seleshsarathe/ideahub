const nodemailer = require("nodemailer");
const googleApis = require("googleapis");

const REDIRECT_URI = `https://developers.google.com/oauthplayground`;
const CLIENT_ID = `1079055429129-8lf6ktvvo1dc1t9o1but4042606t8aaa.apps.googleusercontent.com`;
const CLIENT_SECRET = `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`;
const REFRESH_TOKEN = `1//041twFvTrlevNCgYIARAAGAQSNwF-L9IrWOx7WYAsVWVMrZkObq7-EOxiTj6l7UXojvCRY40UkeS0WgHSeAdRzj5CdcMlsvhLGJ8`;

const authClient = new googleApis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
authClient.setCredentials({refresh_token: REFRESH_TOKEN});

async function mailer(user,link,otp){
    try{
        const ACCESS_TOKEN = await authClient.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "sarkaranurag104@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN
            }
        })

        const details = {
            from: "Anurag Sarkar <sarkranurag104@gmail.com>",
            to: user,
            subject: "Login attempt",
            text: "OTP for Login",
            html: `<h1> ideasHub </h1>
            <h3>click <a href="http://localhost:3000/change/${link}/${otp}"> here </a> to reset your password</h3>`
            
        }

        const result =  await transport.sendMail(details);
        return result;

    }
    catch(err){
        return err;
    }
}

mailer().then(res => {
    console.log("sent mail !", res);
})

module.exports = mailer;
