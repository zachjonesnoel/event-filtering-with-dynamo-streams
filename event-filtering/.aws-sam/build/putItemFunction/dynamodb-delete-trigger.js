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
    let locName = item.OldImage.location_name != undefined ? item.OldImage.location_name.S : ""
    let itemType = item.OldImage.item_type != undefined ? item.OldImage.item_type.S : ""
    await sendEmail({
        subject: "S.H.I.E.L.D security breach!",
        emailBody: `<p>Attention!!! , <br>Hydra is trying to infilterate by deleting our ${itemType} record about ${locName}! All agents stay put. `
    })
    return true;
}

exports.deleteItemTriggerHandler = async (event) => {
    console.log(JSON.stringify(event), null, 2)
    for (let i = 0; i < event.Records.length; i++) {
        await processPutItem(event.Records[i].dynamodb)
    }
    return true;
}
