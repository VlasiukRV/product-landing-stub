export const commonSteps = [
    {
        key: "cart",
        component: "CartView",
        getProps: (ctx) => ({
            cart: ctx.cart,
            total: ctx.total
        }),
        getEvents: ({ updateQuantity, removeFromCart }) => ({
            increase: (i) => updateQuantity(i, 1),
            decrease: (i) => updateQuantity(i, -1),
            remove: removeFromCart
        }),
        navigation: {
            backLabel: "Back to Catalog",
            back: ({ goToStep }) => goToStep("catalog"),
            nextLabel: "Checkout",
            next: ({ goToStep }) => goToStep("checkout")
        }
    },
    {
        key: "checkout",
        component: "CheckoutForm",
        getProps: (ctx) => ({
            userInfo: ctx.userInfo,
            total: ctx.total,
            isProcessing: ctx.isProcessing
        }),
        getEvents: ({ handlePayment, prevStep }) => ({
            pay: handlePayment,
            back: prevStep
        })
    }
];