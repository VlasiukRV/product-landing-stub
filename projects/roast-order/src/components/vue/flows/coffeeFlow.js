
import { commonSteps } from './commonFlow';

export const coffeeFlow = {

    'Roasted Coffee':

    [
        {
            key: "catalog",
            component: "ShopCatalog",
            label: "Coffee",

            getProps: (ctx) => ({
                categories: ctx.categories,
                selectedCategory: ctx.selectedCategory
            }),

            getEvents: ({pendingProduct, nextStep}) => ({
                add: (product) => {
                    pendingProduct.value = product;
                    nextStep();
                }
            }),

            navigation: {
                hideNext: true,
            }
        },

        {
            key: "roast",
            component:
                "RoastSelection",

            getProps:
                (ctx) => ({
                    roasts: ctx.roasts,
                    selected: ctx.roastLevel
                }),

            getEvents:
                ({roastLevel}) => ({
                    select: (v) => (roastLevel.value = v)
                })
        }
        ,

        {
            key: "packaging",
            component: "PackagingSelector",

            getProps: (ctx) => ({
                packaging: ctx.packaging,
                selected: ctx.packag
            }),

            getEvents: ({ packag }) => ({
                select: (v) => (packag.value = v)
            }),

            afterLeave: (ctx) => {
                ctx.confirmSelection();
            }
        },

        ...commonSteps
    ]
}