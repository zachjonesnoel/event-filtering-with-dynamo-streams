var aws = require('aws-sdk');
aws.config.update({ region: 'us-east-1' });
var ses = new aws.SES();

const toEmail = process.env.TO_EMAIL;
const fromEmail = process.env.FROM_EMAIL;

const sendEmail = async (emailObj) => {
    let toAddresses = []
    toAddresses.push(toEmail)
    let mailOptions = {
        Source: fromEmail,
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: emailObj.emailBody,
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: emailObj.subject
            },
        },
        Destination: { 
            ToAddresses: toAddresses 
        }
    }
    await ses.sendEmail(mailOptions).promise();
    return true;
}

const processPutItem = async (item) => {
    let locName = item.NewImage.location_name != undefined ? item.NewImage.location_name.S : ""
    let reportedOn = item.NewImage.reported_on != undefined ? item.NewImage.reported_on.S : ""
    await sendEmail({
        subject: "New Avegner level threat!",
        emailBody: `<p>Attention avengers, <br>New Avenger level threat reported at ${item.NewImage.location_name.S} on ${item.NewImage.reported_on.S}`
    })
    return true;
}

exports.putItemTriggerHandler = async (event) => {
    console.log(JSON.stringify(event), null, 2)
    for (let i = 0; i < event.Records.length; i++) {
        await processPutItem(event.Records[i].dynamodb)
    }
    return true;
}
