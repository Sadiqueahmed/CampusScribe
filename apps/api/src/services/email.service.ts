import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const emailService = {
    // Send welcome email
    sendWelcomeEmail: async (to: string, name: string) => {
        await transporter.sendMail({
            from: '"CampusScribe" <noreply@campusscribe.com>',
            to,
            subject: 'Welcome to CampusScribe!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #3B82F6;">Welcome to CampusScribe, ${name}!</h1>
                    <p>Thank you for joining the ultimate marketplace for university study notes.</p>
                    <p>Start browsing top-tier notes or become a seller today!</p>
                    <a href="${process.env.FRONTEND_URL}/browse" 
                       style="display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                        Start Browsing
                    </a>
                </div>
            `
        });
    },

    // Send purchase confirmation
    sendPurchaseConfirmation: async (to: string, name: string, orderDetails: any) => {
        await transporter.sendMail({
            from: '"CampusScribe" <noreply@campusscribe.com>',
            to,
            subject: 'Your Purchase Confirmation',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #3B82F6;">Thank you for your purchase, ${name}!</h1>
                    <p>Your order has been confirmed. Here are the details:</p>
                    <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Order ID:</strong> ${orderDetails.id}</p>
                        <p><strong>Total:</strong> ₹${orderDetails.total.toFixed(2)}</p>
                        <p><strong>Items:</strong> ${orderDetails.items.length} notes</p>
                    </div>
                    <a href="${process.env.FRONTEND_URL}/orders" 
                       style="display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                        View Your Orders
                    </a>
                </div>
            `
        });
    },

    // Send sale notification to seller
    sendSaleNotification: async (to: string, name: string, saleDetails: any) => {
        await transporter.sendMail({
            from: '"CampusScribe" <noreply@campusscribe.com>',
            to,
            subject: 'You Made a Sale! 🎉',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #10B981;">Congratulations, ${name}!</h1>
                    <p>Someone just purchased your notes:</p>
                    <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Note:</strong> ${saleDetails.noteTitle}</p>
                        <p><strong>Amount Earned:</strong> ₹${saleDetails.amount.toFixed(2)}</p>
                        <p><strong>Your Commission (90%):</strong> ₹${(saleDetails.amount * 0.9).toFixed(2)}</p>
                    </div>
                    <a href="${process.env.FRONTEND_URL}/seller/sales" 
                       style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                        View Sales History
                    </a>
                </div>
            `
        });
    },

    // Send new message notification
    sendMessageNotification: async (to: string, name: string, messageDetails: any) => {
        await transporter.sendMail({
            from: '"CampusScribe" <noreply@campusscribe.com>',
            to,
            subject: 'New Message from ' + messageDetails.senderName,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #3B82F6;">New Message</h1>
                    <p>Hi ${name},</p>
                    <p>You have a new message from <strong>${messageDetails.senderName}</strong>:</p>
                    <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p style="font-style: italic;">"${messageDetails.preview}"</p>
                    </div>
                    <a href="${process.env.FRONTEND_URL}/messages/${messageDetails.conversationId}" 
                       style="display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                        Reply Now
                    </a>
                </div>
            `
        });
    },

    // Send verification approval notification
    sendVerificationApproved: async (to: string, name: string) => {
        await transporter.sendMail({
            from: '"CampusScribe" <noreply@campusscribe.com>',
            to,
            subject: 'Seller Verification Approved! ✅',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #10B981;">Congratulations, ${name}!</h1>
                    <p>Your seller verification has been approved. You can now:</p>
                    <ul>
                        <li>Upload and sell unlimited notes</li>
                        <li>Earn 90% commission on every sale</li>
                        <li>Get featured on our platform</li>
                    </ul>
                    <a href="${process.env.FRONTEND_URL}/notes/upload" 
                       style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                        Upload Your First Note
                    </a>
                </div>
            `
        });
    },

    // Send password reset email
    sendPasswordReset: async (to: string, resetToken: string) => {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        await transporter.sendMail({
            from: '"CampusScribe" <noreply@campusscribe.com>',
            to,
            subject: 'Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #3B82F6;">Password Reset</h1>
                    <p>You requested a password reset. Click the link below to reset your password:</p>
                    <a href="${resetUrl}" 
                       style="display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
                        Reset Password
                    </a>
                    <p style="color: #6B7280; font-size: 12px;">This link expires in 1 hour. If you didn't request this, please ignore this email.</p>
                </div>
            `
        });
    }
};
