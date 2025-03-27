import * as PortOne from "@portone/browser-sdk/v2";

export const portOnePayRequest = async ({ orderName, totalAmount }) => {
    return await PortOne.requestPayment({
        storeId: import.meta.env.VITE_STORE_ID,
        channelKey: import.meta.env.VITE_CHANNEL_KEY,
        paymentId: `mid_${new Date().getTime()}`,
        currency: "CURRENCY_KRW",
        orderName: orderName,
        totalAmount: totalAmount,
        payMethod: "EASY_PAY",
        isTestChannel: true,
    });
};
