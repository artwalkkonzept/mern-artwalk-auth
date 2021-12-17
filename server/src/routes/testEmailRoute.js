import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
    path: "/api/test-email",
    method: "post",
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: "artwalkkonzept+test@gmail.com",
                from: "artwalkkonzept@gmail.com",
                subject: "Does this work?",
                text: "Reading this its works!",
            });
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}